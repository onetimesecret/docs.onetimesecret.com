---
title: Password vs. Passphrase
description: Cross-language guidance on maintaining the critical distinction between account passwords and secret passphrases
---

# Password vs. Passphrase Distinction

Onetime Secret uses two distinct authentication concepts that must be clearly differentiated in translations.

## The Distinction

### Password
- **Purpose**: Account login credentials
- **Context**: User authentication, sign-in, account management
- **Scope**: Global to the user's account

### Passphrase
- **Purpose**: Protection for individual secrets
- **Context**: Secret creation and viewing
- **Scope**: Specific to each secret

## Why This Matters

Users need to understand the difference between:
1. The credentials they use to **access their account**
2. The optional protection they add to **individual secrets**

Mixing these terms creates confusion about which credential is needed when.

## Language Examples

### German
- **Password**: "Passwort" (account login)
- **Passphrase**: "Passphrase" (secret protection)

The German team kept "Passphrase" as a technical loan word to maintain the distinction.

### Spanish
- **Password**: "contraseña" (account login)
- **Passphrase**: "frase de contraseña" (secret protection)

Spanish created a compound term to clarify the phrase-based nature.

### Bulgarian
- **Password**: "парола" (account login)
- **Passphrase**: "ключова фраза" (key phrase for secrets)

Bulgarian developed "ключова фраза" specifically to distinguish from account "парола".

### Japanese
- **Password**: "パスワード" (account login)
- **Passphrase**: "パスフレーズ" (secret protection)

Japanese used loan words but kept them distinct.

### Korean
- **Password**: "비밀번호" (account login)
- **Passphrase**: "접근 문구" (access phrase for secrets)

Korean created "접근 문구" (access phrase) to emphasize the access-granting function.

### French
- **Password**: "mot de passe" (account login)
- **Passphrase**: "phrase secrète" (secret protection)

French distinguished with "phrase secrète" for secret-specific protection.

## Translation Strategies

### Option 1: Loan Word Approach
Keep "passphrase" as a technical term (like German, Japanese):
- Clear distinction from password
- Recognized in technical contexts
- May feel foreign to some users

### Option 2: Descriptive Compound
Create a phrase that describes the function (like Spanish, Bulgarian):
- More natural in the target language
- Clearly indicates purpose
- May be longer for UI elements

### Option 3: Functional Description
Use terms that emphasize the access-granting function (like Korean):
- Natural language flow
- Clear purpose
- May require explanation

## Guidelines

1. **Maintain absolute consistency**
   - Never mix the terms within your language
   - Document your choice clearly

2. **Test in context**
   - How do the terms read in form labels?
   - Are they clear in error messages?
   - Do they fit in UI buttons?

3. **Consider your audience**
   - Technical users may accept loan words
   - General users may prefer descriptive terms

4. **Avoid confusion**
   - Don't use variations that could be confused
   - Make the distinction obvious

## Testing Your Translation

Create these test phrases and see if the distinction is clear:

- "Enter your [password] to sign in"
- "Enter the [passphrase] to view this secret"
- "Incorrect [password]" (login context)
- "Incorrect [passphrase]" (secret viewing context)
- "Change your account [password]"
- "This secret is protected with a [passphrase]"

If these sentences create confusion about which credential is needed, revise your translation approach.
