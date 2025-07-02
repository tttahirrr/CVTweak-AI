from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import inch

def create_pdf(input_file, output_file):
    # Read the text file
    with open(input_file, 'r') as f:
        text = f.read()

    # Create PDF
    doc = SimpleDocTemplate(
        output_file,
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72
    )

    # Create styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=16,
        spaceAfter=30
    )
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=12
    )
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=6
    )
    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontSize=12,
        spaceAfter=6,
        leftIndent=20,
        firstLineIndent=-20,
        bulletIndent=0
    )

    # Process text into paragraphs
    paragraphs = []
    for line in text.split('\n'):
        if line.strip():
            if line.startswith('•'):
                # Bullet points with proper formatting
                paragraphs.append(Paragraph(f"• {line[1:].strip()}", bullet_style))
            elif line.isupper() and len(line) < 50:
                # Section headers
                paragraphs.append(Paragraph(line, heading_style))
            else:
                # Regular text
                paragraphs.append(Paragraph(line, normal_style))
        else:
            paragraphs.append(Spacer(1, 12))

    # Build PDF
    doc.build(paragraphs)

if __name__ == '__main__':
    create_pdf('test_resume.txt', 'test_resume.pdf')
    print("Created test_resume.pdf") 