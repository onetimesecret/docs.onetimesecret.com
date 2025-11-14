# Korean (ko) Translation Notes

## Key Terminology

### Secret Translation
- **Choice:** "비밀 메시지" (secret message)
- **Rationale:** Emphasizes the nature of confidential information being shared rather than personal secrets
- **Alternative:** "비밀" (secret) used in shorter UI elements where context is clear

### Password vs. Passphrase Distinction
- **Password:** "비밀번호" (bimilbeonho) - standard term for account login credentials
- **Passphrase:** "접근 문구" (jeobgeun mungu) - translated as "access phrase" to distinguish from account passwords
- **Rationale:** Provides clear distinction between protection for individual secrets versus account credentials

### Burn Translation
- **Choice:** "소각" (sogak) - incinerate/burn
- **Rationale:** Emphasizes permanent deletion before viewing

### Brand Terms
Left untranslated as specified: "Onetime Secret", "OTS", "Identity Plus"

## Translation Style

### Voice and Tone

1. **Active, imperative voice for buttons and actions**
   - Example: "비밀 링크 생성" (Create secret link)
   - Example: "복사" (Copy)

2. **Passive or declarative voice for status messages and notifications**
   - Example: "복사됨" (Copied)
   - Example: "생성되었습니다" (Has been created)

3. **Professional yet approachable tone**
   - Maintained throughout the interface
   - Clear, direct language
   - Accessible to users with varying technical backgrounds

### Grammar and Style

1. **Standard punctuation** used appropriately
2. **Direct user address** using second person where appropriate
3. **Natural-sounding translations** over literal ones
4. **Consistent politeness levels** appropriate for professional application

## Thinking Behind Translation Adjustments

### 1. Terminology Consistency

The most important adjustment was establishing consistent terminology for key concepts throughout the application.

**Changes made:**
- Consistently translated "secret" as "비밀 메시지" (secret message) rather than just "비밀" (secret) to clearly distinguish from generic secrets
- Consistently used "접근 문구" (access phrase) for passphrase to distinguish from account passwords ("비밀번호")
- Consistently used "소각" (incinerate) for burn to emphasize permanent deletion

### 2. Natural Language Flow

Some existing translations appeared to follow English sentence structure too closely. Adjusted these to follow more natural Korean language patterns while preserving the original meaning.

### 3. Technical Accuracy

Ensured technical terms were accurately translated while remaining accessible to both technical and non-technical users. This included careful translation of concepts related to encryption, security features, and domain settings.

### 4. Cultural Adaptation

Some phrases were adjusted to better resonate with Korean users' expectations and communication norms, making the interface feel more native rather than obviously translated.

## Important Translation Examples

### 1. Security Terminology
```
"burn_this_secret": "이 비밀 메시지 소각"
"view_secret": "비밀 메시지 보기"
```

### 2. UI Actions
```
"create_secret": "비밀 링크 생성"
"copy_to_clipboard": "클립보드에 복사"
```

### 3. Status Messages
```
"copied": "복사됨"
"created": "생성되었습니다"
```

### 4. Instructions
```
"enter_passphrase": "접근 문구를 입력하세요"
"careful_only_see_once": "주의: 한 번만 볼 수 있습니다"
```

## Summary of Changes to the Korean Translation

### Key Terminology Improvements

1. **Consistent Translation of "secret"**: Changed inconsistent uses of "비밀" to "비밀 메시지" throughout the application to clarify the nature of what's being shared

2. **Clear Distinction between "password" and "passphrase"**: Implemented "비밀번호" for account passwords and "접근 문구" for secret protection consistently

3. **Technical Term Clarity**: Terms like "burn" (소각), "encryption" (암호화), and "one-time access" (일회성 접근) were standardized throughout the application

### User Interface Improvements

1. **Button Labels**: Optimized button text for Korean UI conventions, ensuring they're concise while maintaining clarity

2. **Error Messages**: Made error messages more natural and helpful in Korean while preserving their informative nature

3. **Instructional Text**: Adjusted guidance text to sound more natural in Korean while providing clear instructions

### Structural Enhancements

1. **Korean Sentence Structure**: Reworked sentences that followed English structure to use natural Korean grammar patterns

2. **Honorifics and Politeness Levels**: Maintained consistent politeness levels throughout the interface appropriate for a professional application

3. **Length Considerations**: Adjusted translations to account for text expansion/contraction between English and Korean to ensure UI elements display properly

These changes collectively create a more cohesive, natural, and professional Korean localization that will better serve Korean-speaking users of Onetime Secret while maintaining the security focus and clear communication that is central to the application.
