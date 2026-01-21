---
title: Voice and Tone
description: Universal guidelines for voice patterns, formality levels, and tone consistency across all translations
---

# Voice and Tone Guidelines

Detailed guidance on when to use different voices in interface elements.

## Voice Patterns by Context

### User Actions (Active/Imperative Voice)

**Buttons**
```
✅ Save changes
✅ Delete secret
✅ Copy to clipboard
✅ Generate password
✅ Sign in
✅ Create account
```

**Menu Items**
```
✅ View settings
✅ Create new folder
✅ Download file
✅ Share secret
```

**Form Labels and Instructions**
```
✅ Enter your email
✅ Choose a password
✅ Select expiration time
✅ Add optional message
```

### System Communication (Passive/Declarative Voice)

**Status Messages**
```
✅ Changes saved successfully
✅ Secret created
✅ File deleted
✅ Link copied to clipboard
✅ Password updated
```

**Notifications**
```
✅ 3 new messages received
✅ Download completed
✅ Connection restored
✅ Backup finished
```

**System States**
```
✅ Loading content
✅ Connection lost
✅ Email address not found
✅ Service temporarily unavailable
```

**Error Messages**
```
✅ Password incorrect
✅ Secret not found
✅ Upload failed
✅ Session expired
```

## Context-Specific Examples

### Form Submission Flow
1. **Button**: "Save changes" (imperative)
2. **Processing**: "Saving changes..." (progressive)
3. **Success**: "Changes saved successfully" (passive)
4. **Error**: "Save failed - please try again" (declarative)

### File Operations
1. **Action**: "Download file" (imperative)
2. **Progress**: "Downloading..." (progressive)
3. **Complete**: "Download completed" (passive)
4. **Error**: "Download failed" (declarative)

### Secret Management
1. **Creation**: "Create secret" (imperative)
2. **Status**: "Secret created" (passive)
3. **Viewing**: "View secret" (imperative)
4. **Result**: "Secret viewed and destroyed" (passive)

## Language-Specific Considerations

### Formality Levels

**Informal Languages (tu/du form)**
- Spanish: "Crea tu secreto" (Create your secret)
- German: "Erstelle dein Geheimnis" (Create your secret)
- French: "Crée ton secret" (Create your secret)

**Formal Languages (usted/Sie form)**
- Spanish (formal): "Cree su secreto" (Create your secret)
- German (formal): "Erstellen Sie Ihr Geheimnis" (Create your secret)
- French (formal): "Créez votre secret" (Create your secret)

### Grammatical Structures

**Languages with Complex Verb Conjugation**
- Maintain consistency in person and formality
- Choose one approach and apply throughout
- Document your choice for future translators

**Languages with Honorific Systems**
- Use appropriate level for professional software
- Balance respect with accessibility
- Consider your primary user base

### Cultural Tone Adaptations

**Direct Communication Cultures**
- Clear, concise instructions
- Straightforward error messages
- Minimal hedging or qualification

**Indirect Communication Cultures**
- Softer error language where appropriate
- More polite request forms
- Cultural courtesy markers

## Implementation Guidelines

### Consistency Checks
1. **Within features**: All buttons in a feature use same voice
2. **Across features**: Similar elements use same patterns
3. **Error handling**: All errors follow same tone
4. **Success states**: All confirmations use same voice

### Testing Your Voice Choices

Create these test scenarios in your language:

**Action Sequence Test**
1. User clicks "Delete secret" (button)
2. System shows "Are you sure?" (confirmation)
3. User confirms
4. System shows "Secret deleted" (status)

**Error Recovery Test**
1. User clicks "Save changes" (button)
2. System shows "Connection failed" (error)
3. User clicks "Try again" (button)
4. System shows "Changes saved" (success)

### Common Pitfalls to Avoid

**Mixing Voices Inappropriately**
- ❌ Button: "Changes will be saved" (passive)
- ✅ Button: "Save changes" (imperative)

**Overly Technical Language**
- ❌ Status: "HTTP 404 error encountered"
- ✅ Status: "Page not found"

**Inconsistent Formality**
- ❌ Mixed: "Click here" + "Please proceed to..."
- ✅ Consistent: "Click here" + "Go to..." OR "Please click here" + "Please proceed to..."

**Unclear Agency**
- ❌ Ambiguous: "Secret deleted" (by whom?)
- ✅ Clear context: "Secret deleted" (after user action) vs "Secret expired" (automatic)

## Regional Variations

When working with languages that span multiple regions:

1. **Choose primary variant** for consistency
2. **Document regional differences** that matter
3. **Test with users** from different regions when possible
4. **Avoid region-specific idioms** in core interface

Remember: Consistent voice patterns help users understand what actions they can take and what the system is communicating to them.
