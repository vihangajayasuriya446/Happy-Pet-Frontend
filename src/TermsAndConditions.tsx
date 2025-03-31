import React from 'react';
import {
  Container,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Box,
  useTheme
} from '@mui/material';

const TermsAndConditions: React.FC = () => {
  const theme = useTheme();
  const headingColor = '#003366';
  const listBackground = 'rgba(0, 51, 102, 0.03)';
  const sectionBorderColor = '#003366';

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={0} sx={{ 
        p: { xs: 3, md: 5 }, 
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${theme.palette.divider}`,
      }}>
        <Box mb={5}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: headingColor,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            TERMS AND CONDITIONS
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: March 09, 2025
          </Typography>
          <Divider sx={{ 
            my: 4,
            borderWidth: 1,
            borderColor: theme.palette.divider
          }} />
        </Box>

        {/* Section 1 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            1. AGREEMENT TO OUR LEGAL TERMS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Welcome to HappyPet LLC ("Company," "We," "Us," or "Our"). We are a company registered in Sri Lanka, located at Colombo 04, Western Province. Our website, <Link href="http://www.happypet.com.lk" color="primary">happypet.com.lk</Link> (the "Site"), and associated services (collectively, the "Services") are designed to facilitate pet adoption, sales, and welfare contributions.
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            By accessing or using the Services, You ("User") agree to comply with and be bound by these Terms and Conditions ("Legal Terms"). If You do not agree, You must discontinue use immediately.
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            For inquiries, contact Us:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Phone:" secondary="+94 77 009 2167" />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText 
                primary="Email:" 
                secondary={
                  <Link href="mailto:happypet@gmail.com" color="primary">
                    happypet@gmail.com
                  </Link>
                } 
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Address:" secondary="Bambalapitiya, Colombo, Western Province, Sri Lanka" />
            </ListItem>
          </List>
        </Box>

        {/* Section 2 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            2. INTELLECTUAL PROPERTY RIGHTS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            All content within the Services, including text, images, graphics, trademarks, and software, is owned by or licensed to HappyPet LLC. Users are granted a limited, non-exclusive, and non-transferable license to use the Services for personal, non-commercial purposes.
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            You may not:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Copy, modify, distribute, or exploit any part of the Services without prior written permission." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Use Our trademarks or branding without authorization." />
            </ListItem>
          </List>
        </Box>

        {/* Section 3 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            3. USER REPRESENTATIONS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            By using the Services, You confirm that:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="You are at least 18 years old or have parental/guardian consent." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="You will not use the Services for fraudulent, illegal, or unauthorized activities." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="You will comply with all applicable laws and regulations." />
            </ListItem>
          </List>
        </Box>

        {/* Section 4 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            4. USER REGISTRATION
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            To access certain features, You may be required to register an account. You are responsible for safeguarding Your login credentials and any activities under Your account. Notify Us immediately of unauthorized account usage.
          </Typography>
        </Box>

        {/* Section 5 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            5. PRODUCTS AND SERVICES
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We make reasonable efforts to ensure the accuracy of product descriptions, images, and availability. However, We do not guarantee that product details are error-free. Prices and availability are subject to change without notice.
          </Typography>
        </Box>

        {/* Section 6 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            6. PURCHASES AND PAYMENTS
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Accepted payment methods: Visa and Mastercard." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="You agree to provide accurate payment details and authorize Us to charge Your selected payment method." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Transactions are processed securely, but We are not liable for third-party payment failures." />
            </ListItem>
          </List>
        </Box>

        {/* Section 7 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            7. RETURN AND REFUND POLICY
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="All sales are final. Refunds will not be issued unless required by law." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="If You receive a defective or incorrect item, contact Us within 7 days for resolution." />
            </ListItem>
          </List>
        </Box>

        {/* Section 8 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            8. PROHIBITED ACTIVITIES
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Users must not:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Harass, abuse, or harm others." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Upload viruses, malware, or any malicious code." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Infringe upon intellectual property rights." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Engage in fraudulent or deceptive conduct." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Attempt to disrupt, hack, or manipulate the Services." />
            </ListItem>
          </List>
        </Box>

        {/* Continue with remaining sections following the same pattern */}
        {/* Section 9 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            9. USER-GENERATED CONTENT
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            By submitting content (e.g., reviews, images, comments) on Our platform, You grant Us a worldwide, royalty-free license to use, distribute, and display such content.
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            You retain ownership but agree that:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="We may modify or remove inappropriate content." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Your content must not be illegal, defamatory, or misleading." />
            </ListItem>
          </List>
        </Box>

        {/* Section 10 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            10. THIRD-PARTY LINKS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Our Services may contain links to third-party websites. We do not endorse or assume responsibility for their content, policies, or practices. Use third-party services at Your own risk.
          </Typography>
        </Box>

        {/* Section 11 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            11. SERVICE MANAGEMENT
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We reserve the right to:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Monitor platform activity." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Modify, suspend, or terminate Services without prior notice." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Implement security measures to protect data integrity." />
            </ListItem>
          </List>
        </Box>

        {/* Section 12 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            12. PRIVACY POLICY
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Your use of the Services is also governed by Our <Link href="#" color="primary">Privacy Policy</Link>, which explains how We collect, use, and protect Your personal data.
          </Typography>
        </Box>

        {/* Section 13 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            13. COPYRIGHT INFRINGEMENTS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            If You believe that Your copyrighted material has been used without authorization, contact Us at <Link href="mailto:happypet@gmail.com" color="primary">happypet@gmail.com</Link> with supporting evidence.
          </Typography>
        </Box>

        {/* Section 14 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            14. TERMINATION OF USE
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We reserve the right to terminate or suspend Your access to the Services at Our discretion, without notice, if:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="You violate these Terms." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Your activity poses a security risk." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="We are required to comply with legal obligations." />
            </ListItem>
          </List>
        </Box>

        {/* Section 15 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            15. MODIFICATIONS AND INTERRUPTIONS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We may modify these Terms or discontinue any part of the Services at any time. It is Your responsibility to review the updated Terms periodically.
          </Typography>
        </Box>

        {/* Section 16 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            16. GOVERNING LAW AND DISPUTE RESOLUTION
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="These Terms are governed by the laws of Sri Lanka." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Disputes will be resolved through binding arbitration in Colombo, Sri Lanka." />
            </ListItem>
          </List>
        </Box>

        {/* Section 17 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            17. DISCLAIMER OF WARRANTIES
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            The Services are provided "as is" and "as available" without warranties of any kind. We do not guarantee uninterrupted, secure, or error-free operation.
          </Typography>
        </Box>

        {/* Section 18 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            18. LIMITATIONS OF LIABILITY
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            To the maximum extent permitted by law, We are not liable for any:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Indirect, incidental, or consequential damages arising from Your use of the Services." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Loss of profits, data, or goodwill." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Unauthorized access to or alterations of Your transmissions or data." />
            </ListItem>
          </List>
        </Box>

        {/* Section 19 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            19. INDEMNIFICATION
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            You agree to indemnify and hold Us harmless from any claims, damages, or legal actions resulting from:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Your breach of these Terms." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Your use or misuse of the Services." />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Your violation of any law or third-party rights." />
            </ListItem>
          </List>
        </Box>

        {/* Section 20 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            20. USER DATA RESPONSIBILITY
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            You are responsible for the accuracy, security, and backup of any data You provide through the Services.
          </Typography>
        </Box>

        {/* Section 21 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            21. ELECTRONIC COMMUNICATIONS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            By using the Services, You consent to receive electronic communications, including emails, notifications, and updates.
          </Typography>
        </Box>

        {/* Section 22 */}
        <Box mb={5} sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            22. MISCELLANEOUS
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            These Terms constitute the entire agreement between You and Us. If any provision is deemed invalid, the remaining provisions shall remain enforceable.
          </Typography>
        </Box>

        {/* Section 23 */}
        <Box sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderLeft: `4px solid ${sectionBorderColor}`
        }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 3,
            color: headingColor
          }}>
            23. CONTACT INFORMATION
          </Typography>
          <Typography paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
            For further inquiries, please contact Us at:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Company Name:" secondary="HappyPet LLC" />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Address:" secondary="Bambalapitiya, Colombo, Western Province, Sri Lanka" />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText primary="Phone:" secondary="+94 77 009 2167" />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText 
                primary="Email:" 
                secondary={
                  <Link href="mailto:happypet@gmail.com" color="primary">
                    happypet@gmail.com
                  </Link>
                } 
              />
            </ListItem>
          </List>
          <Typography paragraph sx={{ mt: 3, lineHeight: 1.7, fontStyle: 'italic' }}>
            By using the Services, You acknowledge that You have read, understood, and agree to be bound by these Terms and Conditions.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;