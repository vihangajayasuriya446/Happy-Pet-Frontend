import React from 'react';
import styled from 'styled-components';

const SupportPage: React.FC = () => {
  return (
    <SupportContainer>
      <Header>Happy Pet Support</Header>
      <Content>
        <Section>
          <Title>Frequently Asked Questions</Title>
          <Text>
            Here are some common questions and answers to help you get the most out of Happy Pet.
          </Text>
          <Question>How do I create an account?</Question>
          <Answer>
            You can create an account by clicking on the "Sign Up" button on the top right corner of our homepage.
          </Answer>
          <Question>How do I reset my password?</Question>
          <Answer>
            You can reset your password by clicking on the "Forgot Password" link on the login page.
          </Answer>
        </Section>
        <Section>
          <Title>Contact Us</Title>
          <Text>
            If you have any other questions or need further assistance, please feel free to contact us.
          </Text>
          <ContactInfo>
            <strong>Email:</strong> support@happypet.com
          </ContactInfo>
          <ContactInfo>
            <strong>Phone:</strong> +1 (123) 456-7890
          </ContactInfo>
          <ContactInfo>
            <strong>Address:</strong> 123 Pet Lane, Happy City, HC 12345
          </ContactInfo>
        </Section>
      </Content>
    </SupportContainer>
  );
};

export default SupportPage;

// Styled Components
const SupportContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow:rgb(255, 255, 255);
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  color: #444;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const Question = styled.h3`
  font-size: 1.25rem;
  color: #555;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Answer = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const ContactInfo = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;