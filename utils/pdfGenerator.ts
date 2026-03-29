import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FIELD_MAPPING, SPOUSE_START_X, SPOUSE_COL_WIDTH, SPOUSE_FIELD_Y, CHILD_START_X, CHILD_COL_WIDTH, CHILD_FIELD_Y } from '@/config/fieldMapping';
import { splitRib } from '@/utils/ribUtils';
import type { FormState, Child, Spouse } from '@/stores/useFormStore';

/**
 * Generates the filled PDF as Uint8Array bytes.
 */
export const generatePdfBlob = async (state: FormState): Promise<Uint8Array> => {
  // 1. Load the template
  const response = await fetch('/templates/Bulletin_FH2S.pdf');
  if (!response.ok) {
    throw new Error('Failed to load PDF template');
  }
  const existingPdfBytes = await response.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Helper to draw text 
  const drawText = (text: string | undefined, x: number | undefined, y: number | undefined, fontSize = 8, isBold = false) => {
    if (!text || x === undefined || y === undefined) return;
    firstPage.drawText(text, {
      x,
      y,
      size: fontSize,
      font: isBold ? fontBold : font,
      color: rgb(0, 0, 0),
    });
  };

  // Helper to draw a checkbox 
  const drawCheckbox = (isChecked: boolean, x: number | undefined, y: number | undefined) => {
    if (x === undefined || y === undefined) return;
    if (isChecked) {
      firstPage.drawText('X', {
        x, 
        y,
        size: 10,
        font: fontBold,
        color: rgb(0, 0, 0.5), 
      });
    }
  };

  // Helper to format YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr || !dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [y, m, d] = parts;
    return `${d}-${m}-${y}`;
  };

  // Helper to draw digits with spacing
  const drawDigits = (text: string | undefined, config: any) => {
    if (!text || !config?.x || !config?.y) return;
    const spacing = config.options?.spacing || 10;
    const digits = text.split('');
    digits.forEach((digit, i) => {
      drawText(digit, config.x + (i * spacing), config.y, config.fontSize || 9, true);
    });
  };

  // 2. Map Fields
  
  // Top References
  drawText(state.insuranceAffiliation, FIELD_MAPPING.insuranceAffiliation?.x, FIELD_MAPPING.insuranceAffiliation?.y, 9);
  drawText(state.cnopsRegistration, FIELD_MAPPING.cnopsRegistration?.x, FIELD_MAPPING.cnopsRegistration?.y, 9);
  drawText(state.foundationAffiliation, FIELD_MAPPING.foundationAffiliation?.x, FIELD_MAPPING.foundationAffiliation?.y, 9);

  // Bulletin Type
  drawCheckbox(state.bulletinType === 'nouvelle_adhesion', FIELD_MAPPING.bulletinAdhesion?.x, FIELD_MAPPING.bulletinAdhesion?.y);
  drawCheckbox(state.bulletinType === 'avenant', FIELD_MAPPING.bulletinAvenant?.x, FIELD_MAPPING.bulletinAvenant?.y);

  // Member Status
  drawCheckbox(state.memberStatus === 'actif', FIELD_MAPPING.memberActif?.x, FIELD_MAPPING.memberActif?.y);
  drawCheckbox(state.memberStatus === 'retraite', FIELD_MAPPING.memberRetraite?.x, FIELD_MAPPING.memberRetraite?.y);

  // Identity
  drawText(state.ppr, FIELD_MAPPING.ppr?.x, FIELD_MAPPING.ppr?.y, 9, true);
  drawCheckbox(state.civility === 'mr', FIELD_MAPPING.civilityMr?.x, FIELD_MAPPING.civilityMr?.y);
  drawCheckbox(state.civility === 'mme', FIELD_MAPPING.civilityMme?.x, FIELD_MAPPING.civilityMme?.y);
  
  drawText(state.lastName, FIELD_MAPPING.lastName?.x, FIELD_MAPPING.lastName?.y, 9, true);
  drawText(state.firstName, FIELD_MAPPING.firstName?.x, FIELD_MAPPING.firstName?.y, 9, true);
  
  // Date with digits
  drawDigits(state.birthDay, FIELD_MAPPING.birthDay);
  drawDigits(state.birthMonth, FIELD_MAPPING.birthMonth);
  drawDigits(state.birthYear, FIELD_MAPPING.birthYear);
  drawText(state.birthPlace, FIELD_MAPPING.birthPlace?.x, FIELD_MAPPING.birthPlace?.y, 9);

  drawText(state.cin, FIELD_MAPPING.cin?.x, FIELD_MAPPING.cin?.y, 9, true);
  drawText(state.documentType, FIELD_MAPPING.docType?.x, FIELD_MAPPING.docType?.y, 9);
  drawText(formatDate(state.documentExpiry), FIELD_MAPPING.docExpiry?.x, FIELD_MAPPING.docExpiry?.y, 9);

  // Family Status
  drawCheckbox(state.familyStatus === 'celibataire', FIELD_MAPPING.statusCelibataire?.x, FIELD_MAPPING.statusCelibataire?.y);
  drawCheckbox(state.familyStatus === 'marie', FIELD_MAPPING.statusMarie?.x, FIELD_MAPPING.statusMarie?.y);
  drawCheckbox(state.familyStatus === 'divorce', FIELD_MAPPING.statusDivorce?.x, FIELD_MAPPING.statusDivorce?.y);
  drawCheckbox(state.familyStatus === 'veuf', FIELD_MAPPING.statusVeuf?.x, FIELD_MAPPING.statusVeuf?.y);
  drawText(state.numberOfDependentChildren, FIELD_MAPPING.numChildren?.x, FIELD_MAPPING.numChildren?.y, 9);

  // Contact
  drawText(state.address, FIELD_MAPPING.address?.x, FIELD_MAPPING.address?.y, 9);
  drawText(state.city, FIELD_MAPPING.city?.x, FIELD_MAPPING.city?.y, 9);
  drawText(state.phoneFixed, FIELD_MAPPING.phoneFixed?.x, FIELD_MAPPING.phoneFixed?.y, 9);
  drawText(state.gsm, FIELD_MAPPING.gsm?.x, FIELD_MAPPING.gsm?.y, 9);
  drawText(state.email, FIELD_MAPPING.email?.x, FIELD_MAPPING.email?.y, 9);

  // -------------------------------------------------------------------------
  // COLUMNAR TABLE: Spouses (Bénéficiaires Conjoints)
  // Each spouse is a column (X), each field is a row (Y)
  // -------------------------------------------------------------------------
  state.spouses.forEach((spouse, index) => {
    const xOffset = SPOUSE_START_X + (index * SPOUSE_COL_WIDTH);
    
    drawText(spouse.lastName, xOffset, SPOUSE_FIELD_Y.lastName, 8);
    drawText(spouse.firstName, xOffset, SPOUSE_FIELD_Y.firstName, 8);
    drawText(formatDate(spouse.birthDate), xOffset, SPOUSE_FIELD_Y.birthDate, 8);
    drawText(spouse.profession, xOffset, SPOUSE_FIELD_Y.profession, 8);
  });

  // -------------------------------------------------------------------------
  // COLUMNAR TABLE: Children (Bénéficiaires Enfants)
  // Each child is a column (X), each field is a row (Y)
  // -------------------------------------------------------------------------
  state.children.forEach((child, index) => {
    const xOffset = CHILD_START_X + (index * CHILD_COL_WIDTH);
    
    drawText(child.name, xOffset, CHILD_FIELD_Y.firstName, 8); // Assuming name is Prenom or Full
    drawText(formatDate(child.birthDate), xOffset, CHILD_FIELD_Y.birthDate, 8);
    drawText(child.baseRegimeInsurer, xOffset, CHILD_FIELD_Y.baseRegime, 8);
    drawText(child.situation, xOffset, CHILD_FIELD_Y.situation, 8);
  });

  // RIB
  const ribDigits = splitRib(state.rib);
  drawDigits(ribDigits.join(''), { ...FIELD_MAPPING.rib_digit_start, fontSize: 11 });

  // Signature
  drawText(state.signedAt, FIELD_MAPPING.signedAt?.x, FIELD_MAPPING.signedAt?.y, 9);
  drawText(formatDate(state.signedDate), FIELD_MAPPING.signedDate?.x, FIELD_MAPPING.signedDate?.y, 9);

  // 3. Save
  return await pdfDoc.save();
};

/**
 * Helper to download the PDF.
 */
export const downloadPdf = (bytes: Uint8Array, fileName: string) => {
  const blob = new Blob([bytes as any], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Helper to print the PDF.
 */
export const printPdf = (bytes: Uint8Array) => {
  const blob = new Blob([bytes as any], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  iframe.onload = () => {
    iframe.contentWindow?.print();
  };
};
