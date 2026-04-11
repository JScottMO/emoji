import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Emoji Spark"

interface FeedbackNotificationProps {
  category?: string
  name?: string
  email?: string
  message?: string
}

const FeedbackNotificationEmail = ({ category, name, email, message }: FeedbackNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New feedback: {category ?? 'General'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Feedback Received</Heading>
        <Text style={text}>A new feedback submission was received on {SITE_NAME}.</Text>

        <Section style={detailsBox}>
          <Text style={label}>Category</Text>
          <Text style={value}>{category ?? 'General'}</Text>

          <Text style={label}>From</Text>
          <Text style={value}>{name ?? 'Anonymous'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email ?? 'Not provided'}</Text>
        </Section>

        <Hr style={hr} />

        <Text style={label}>Message</Text>
        <Text style={messageStyle}>{message ?? '(No message)'}</Text>

        <Text style={footer}>This is an automated notification from {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: FeedbackNotificationEmail,
  subject: (data: Record<string, any>) => `New feedback: ${data.category ?? 'General'}`,
  to: 'jscottchristianson@mac.com',
  displayName: 'Feedback notification',
  previewData: {
    category: '💡 Feature Request',
    name: 'Jane Doe',
    email: 'jane@example.com',
    message: 'It would be great to have emoji search by color!',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '24px 28px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#1a1a1a', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 20px' }
const detailsBox = { backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px' }
const label = { fontSize: '12px', fontWeight: '600' as const, color: '#888', textTransform: 'uppercase' as const, margin: '0 0 2px', letterSpacing: '0.5px' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0 0 14px', lineHeight: '1.4' }
const hr = { borderColor: '#eaeaea', margin: '20px 0' }
const messageStyle = { fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6', margin: '4px 0 24px', whiteSpace: 'pre-wrap' as const }
const footer = { fontSize: '12px', color: '#999', margin: '30px 0 0' }
