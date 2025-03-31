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

const PrivacyPolicy: React.FC = () => {
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
            Privacy Policy
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

        <Box mb={5}>
          <Typography paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            HappyPet LLC ("Company," "We," "Us," or "Our") is committed to protecting Your privacy. This Privacy Policy explains how We collect, use, disclose, and safeguard Your information when You use Our Service. By accessing or using Our Website, You agree to the terms of this Privacy Policy.
          </Typography>
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
            1. Interpretation and Definitions
          </Typography>
          
          <Box mb={3}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ 
              fontWeight: 500,
              color: headingColor
            }}>
              1.1 Interpretation
            </Typography>
            <Typography paragraph sx={{ lineHeight: 1.7 }}>
              Words with capitalized initial letters have meanings defined under the following conditions. The definitions below apply whether the terms appear in singular or plural.
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="h5" component="h3" gutterBottom sx={{ 
              fontWeight: 500,
              color: headingColor
            }}>
              1.2 Definitions
            </Typography>
            <Typography paragraph sx={{ mb: 2 }}>For the purposes of this Privacy Policy:</Typography>
            <List dense sx={{ 
              backgroundColor: listBackground,
              borderRadius: 1,
              p: 2
            }}>
              {[
                { term: "Account", definition: " refers to a unique profile created for You to access Our Service." },
                { term: "Affiliate", definition: " means any entity that controls, is controlled by, or is under common control with Us, where 'control' refers to the ownership of at least 50% of shares, equity interest, or voting rights." },
                { term: "Company", definition: " refers to HappyPet LLC, located in Colombo 04, Sri Lanka." },
                { term: "Cookies", definition: " are small files placed on Your Device that store details about Your browsing activity." },
                { term: "Country", definition:  "refers to Sri Lanka." },
                { term: "Device", definition: " means any electronic device, including a computer, mobile phone, or tablet, used to access the Service." },
                { term: "Personal Data", definition: " means any information that identifies or can be used to identify an individual." },
                { term: "Service", definition: " refers to Our website, accessible at happypet.com.lk." },
                { term: "Service Provider", definition: " refers to any third-party entity that processes data on behalf of the Company, including analytics, payment processing, and hosting providers." },
                { term: "Usage Data", definition: " refers to data collected automatically, including browsing behavior, IP addresses, and session duration." },
                { term: "You", definition: " refers to the individual accessing or using the Service or a legal entity on behalf of which such individual is acting." },
              ].map((item) => (
                <ListItem key={item.term} sx={{ 
                  py: 1,
                  '&:not(:last-child)': {
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }
                }}>
                  <ListItemText
                    primary={<Typography component="span" sx={{ fontWeight: 500 }}>{item.term}</Typography>}
                    secondary={item.definition}
                    secondaryTypographyProps={{ 
                      component: "span",
                      sx: { display: 'inline' }
                    }}
                    sx={{ my: 0 }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
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
            2. Collection and Use of Personal Data
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We collect and process Your Personal Data to improve Our Service, enhance user experience, and comply with legal obligations.
          </Typography>
          
          <Box mt={3}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ 
              fontWeight: 500,
              color: headingColor
            }}>
              2.1 Types of Data Collected
            </Typography>
            
            <Box mb={3}>
              <Typography variant="subtitle1" component="h4" gutterBottom sx={{ 
                fontWeight: 500,
                color: headingColor
              }}>
                a) Personal Data
              </Typography>
              <Typography paragraph sx={{ mb: 2 }}>
                While using Our Service, We may collect the following Personal Data:
              </Typography>
              <List dense sx={{ 
                backgroundColor: listBackground,
                borderRadius: 1,
                p: 2
              }}>
                {["Name", "Email address", "Phone number", "Address", "Payment details (if applicable)", "Any other information You voluntarily provide"].map((item) => (
                  <ListItem key={item} sx={{ py: 1 }}>
                    <ListItemText 
                      primary={item} 
                      sx={{ my: 0 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box mb={3}>
              <Typography variant="subtitle1" component="h4" gutterBottom sx={{ 
                fontWeight: 500,
                color: headingColor
              }}>
                b) Usage Data
              </Typography>
              <Typography paragraph sx={{ mb: 2 }}>
                We may collect Usage Data, which includes:
              </Typography>
              <List dense sx={{ 
                backgroundColor: listBackground,
                borderRadius: 1,
                p: 2
              }}>
                {["Your IP address", "Browser type and version", "Pages visited on Our Website", "Time and date of visit", "Time spent on each page"].map((item) => (
                  <ListItem key={item} sx={{ py: 1 }}>
                    <ListItemText primary={item} sx={{ my: 0 }} />
                  </ListItem>
                ))}
              </List>
            </Box>
            
            <Box>
              <Typography variant="subtitle1" component="h4" gutterBottom sx={{ 
                fontWeight: 500,
                color: headingColor
              }}>
                c) Cookies and Tracking Technologies
              </Typography>
              <Typography paragraph sx={{ lineHeight: 1.7 }}>
                We use Cookies and similar tracking technologies to monitor and analyze website activity. You can manage Your cookie preferences in Your browser settings.
              </Typography>
            </Box>
          </Box>
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
            3. How We Use Your Data
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            We may use the collected data for the following purposes:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            {[
              "To provide, maintain, and improve Our Service.",
              "To personalize Your experience.",
              "To process transactions and payments (if applicable).",
              "To respond to inquiries and provide customer support.",
              "To send promotional and marketing communications (only with Your consent).",
              "To detect and prevent fraud, security issues, or unauthorized activities.",
              "To comply with legal and regulatory obligations."
            ].map((item, index) => (
              <ListItem key={index} sx={{ 
                py: 1,
                '&:not(:last-child)': {
                  borderBottom: `1px solid ${theme.palette.divider}`
                }
              }}>
                <ListItemText 
                  primary={item} 
                  sx={{ my: 0 }}
                  primaryTypographyProps={{ sx: { lineHeight: 1.6 } }}
                />
              </ListItem>
            ))}
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
            4. Sharing and Disclosure of Data
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            We do not sell or rent Your Personal Data. However, We may share Your data in the following cases:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            {[
              { term: "With Service Providers:", definition: "To facilitate operations such as hosting, analytics, and customer support." },
              { term: "With Affiliates:", definition: "To ensure seamless business operations." },
              { term: "For Legal Compliance:", definition: "To comply with laws, regulations, or legal processes." },
              { term: "For Business Transfers:", definition: "In case of a merger, acquisition, or sale of assets." },
            ].map((item, index) => (
              <ListItem key={index} sx={{ 
                py: 1,
                '&:not(:last-child)': {
                  borderBottom: `1px solid ${theme.palette.divider}`
                }
              }}>
                <ListItemText
                  primary={<Typography component="span" sx={{ fontWeight: 500 }}>{item.term}</Typography>}
                  secondary={item.definition}
                  secondaryTypographyProps={{ 
                    component: "span",
                    sx: { display: 'inline', lineHeight: 1.6 }
                  }}
                  sx={{ my: 0 }}
                />
              </ListItem>
            ))}
          </List>
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
            5. Data Security
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We implement appropriate security measures to protect Your Personal Data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and We cannot guarantee absolute security.
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
            6. Your Privacy Rights
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            You have the right to:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2,
            mb: 3
          }}>
            {[
              "Access, update, or delete Your Personal Data.",
              "Object to or restrict data processing.",
              "Withdraw consent for marketing communications at any time.",
              "Lodge a complaint with a data protection authority if You believe Your rights have been violated."
            ].map((item, index) => (
              <ListItem key={index} sx={{ 
                py: 1,
                '&:not(:last-child)': {
                  borderBottom: `1px solid ${theme.palette.divider}`
                }
              }}>
                <ListItemText 
                  primary={item} 
                  sx={{ my: 0 }}
                  primaryTypographyProps={{ sx: { lineHeight: 1.6 } }}
                />
              </ListItem>
            ))}
          </List>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            To exercise Your rights, contact Us at{' '}
            <Link href="mailto:happypet@gmail.com" color="primary" sx={{ fontWeight: 500 }}>
              happypet@gmail.com
            </Link>.
          </Typography>
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
            7. Third-Party Links
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            Our Website may contain links to third-party websites. We are not responsible for the privacy practices of such external sites. Please review their Privacy Policies before providing any data.
          </Typography>
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
            8. Retention of Data
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We retain Your Personal Data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, and resolve disputes.
          </Typography>
        </Box>

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
            9. Changes to This Privacy Policy
          </Typography>
          <Typography paragraph sx={{ lineHeight: 1.7 }}>
            We may update this Privacy Policy periodically. We will notify You of any significant changes by posting the updated version on Our Website with a revised "Last Updated" date.
          </Typography>
        </Box>

        {/* Section 10 */}
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
            10. Contact Us
          </Typography>
          <Typography paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
            If You have any questions or concerns about this Privacy Policy, please contact Us via:
          </Typography>
          <List dense sx={{ 
            backgroundColor: listBackground,
            borderRadius: 1,
            p: 2
          }}>
            <ListItem sx={{ 
              py: 1,
              '&:not(:last-child)': {
                borderBottom: `1px solid ${theme.palette.divider}`
              }
            }}>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 500 }}>Email:</Typography>}
                secondary={
                  <Link href="mailto:happypet@gmail.com" color="primary" sx={{ fontWeight: 500 }}>
                    happypet@gmail.com
                  </Link>
                }
                sx={{ my: 0 }}
                secondaryTypographyProps={{ component: "span" }}
              />
            </ListItem>
            <ListItem sx={{ 
              py: 1,
              '&:not(:last-child)': {
                borderBottom: `1px solid ${theme.palette.divider}`
              }
            }}>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 500 }}>Website:</Typography>}
                secondary={
                  <Link href="https://happypet.com.lk" target="_blank" rel="noopener noreferrer" color="primary" sx={{ fontWeight: 500 }}>
                    happypet.com.lk
                  </Link>
                }
                sx={{ my: 0 }}
                secondaryTypographyProps={{ component: "span" }}
              />
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemText
                primary={<Typography sx={{ fontWeight: 500 }}>Phone:</Typography>}
                secondary={
                  <Link href="tel:+94770092167" color="primary" sx={{ fontWeight: 500 }}>
                    +94 77 009 2167
                  </Link>
                }
                sx={{ my: 0 }}
                secondaryTypographyProps={{ component: "span" }}
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;