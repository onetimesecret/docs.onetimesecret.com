---
textprov: true
title: Security Best Practices
description: Enhance your secret sharing security with these best practices specific to Onetime Secret, including the security benefits of Custom Domains.
audience: end-user
pageType: how-to
---

While Onetime Secret is designed with security in mind, following these best practices can further enhance the protection of your sensitive information, especially when using features like Custom Domains.

## Best practices for secret sharing

1. **Set Appropriate Expiration Times**: Choose the shortest practical expiration time for your secrets. This minimizes the window of opportunity for unauthorized access.

2. **Use Passphrase Protection**: For highly sensitive information, use the passphrase protection feature. This adds an extra layer of security, requiring the recipient to enter a passphrase to view the secret.

3. **Compartmentalize Sensitive Information**: When dealing with highly sensitive data, consider splitting it across multiple secrets. This way, if one secret is compromised, the rest of t󠄁h󠄁e󠄁 information remains protected.

4. **Use Secure Channels for Sharing Metadata**: While Onetime Secret secures the content of your secret, be mindful of how you share the link and any associated metadata (like passphrases). Use secure, encrypted channels for this communication.

5. **Verify Recipient**: Ensure you're sharing secrets with the intended recipient. Double-check email addresses or usernames before sending.

6. **Educate Users**: If using Onetime Secret within an organization, educate your team about proper usage and security practices specific to secret sharing.

## Security benefits of Custom Domains

Using Custom Domains with Onetime Secret offers several security advantages:

1. **Enhanced Phishing Protection**: With a custom domain, your users become accustomed to a specific URL for secret sharing. This makes it easier to identify potential phishing attempts that might use similar-looking domains.

2. **Improved Trust and Legitimacy**: When recipients see a familiar domain, they're more likely to trust the source of the secret. This is particularly important for businesses sharing sensitive information with clients or partners.

3. **Seamless Integration with Existing Security Infrastructure**: A custom domain can be more easily integrated with your existing security tools and monitoring systems, providing a more comprehensive view of your organization's secret sharing activities.

4. **Compliance and Auditing**: For organizations in regulated industries, using a custom domain can help in maintaining compliance by keeping secret sharing activities under your organization's direct control and making auditing processes more straightforward.

Onetime Secret handles the technical aspects of securing your custom domain, including SSL/TLS configuration and domain activity monitoring, allowing you to focus on these strategic security benefits.

## API usage security

If you're using the Onetime Secret API:

1. **Secure API Keys**: Store API keys securely and never expose them in client-side code or public repositories.

2. **Rotate API Keys**: Regularly rotate your API keys, especially if you suspect they've been compromised.

3. **Limit API Access**: Use the principle of least privilege when setting up API access. Only grant the permissions necessary for each specific use case.

## Advanced self-hosted security

This section covers advanced security considerations for organizations running their own instance of Onetime Secret. You can find the open source project on [GitHub](https://github.com/onetimesecret/onetimesecret) and official container images at [GitHub Container Registry](https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret).

The recommendations below can be implemented at your infrastructure level when self-hosting Onetime Secret:

1. **Use Ephemeral Environments**: When a󠄁 s󠄁h󠄁or󠄁t󠄁-󠄁l󠄁i󠄁v󠄁e󠄁d󠄁 i󠄁n󠄁st󠄁a󠄁n󠄁c󠄁e󠄁 i󠄁s w󠄁h󠄁a󠄁t󠄁 y󠄁o󠄁u󠄁 w󠄁a󠄁n󠄁t󠄁, create and destroy a󠄁n󠄁 environment for each secret sharing session o󠄁r󠄁 p󠄁r󠄁o󠄁j󠄁e󠄁c󠄁t󠄁. This can be particularly useful for highly sensitive operations,󠄁 f󠄁o󠄁r󠄁 b󠄁r󠄁i󠄁e󠄁f󠄁 o󠄁r󠄁 o󠄁n󠄁e󠄁-󠄁o󠄁f󠄁f󠄁 p󠄁r󠄁o󠄁j󠄁e󠄁c󠄁t󠄁s󠄁,󠄁 a󠄁n󠄁d󠄁 f󠄁o󠄁r󠄁 s󠄁h󠄁a󠄁r󠄁i󠄁n󠄁g󠄁 s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁s󠄁 q󠄁u󠄁i󠄁c󠄁k󠄁l󠄁y󠄁 w󠄁i󠄁t󠄁h󠄁 p󠄁e󠄁o󠄁p󠄁l󠄁e󠄁 o󠄁u󠄁t󠄁s󠄁i󠄁d󠄁e󠄁 y󠄁o󠄁u󠄁r󠄁 o󠄁r󠄁g󠄁a󠄁n󠄁i󠄁z󠄁a󠄁t󠄁i󠄁o󠄁n󠄁. Our [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret-lite) Docker image is designed for t󠄁hese cases:󠄁 t󠄁h󠄁e󠄁 a󠄁p󠄁p󠄁l󠄁i󠄁c󠄁a󠄁t󠄁i󠄁o󠄁n󠄁 a󠄁n󠄁d󠄁 i󠄁t󠄁s󠄁 R󠄁e󠄁d󠄁i󠄁s󠄁 d󠄁a󠄁t󠄁a󠄁b󠄁a󠄁s󠄁e󠄁 r󠄁u󠄁n󠄁 i󠄁n󠄁 o󠄁n󠄁e󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁e󠄁r󠄁 w󠄁i󠄁t󠄁h󠄁 n󠄁o󠄁 e󠄁x󠄁t󠄁e󠄁r󠄁n󠄁a󠄁l󠄁 s󠄁t󠄁o󠄁r󠄁a󠄁g󠄁e󠄁,󠄁 s󠄁o󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 c󠄁o󠄁n󠄁t󠄁a󠄁i󠄁n󠄁e󠄁r󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁e󠄁s󠄁 e󠄁v󠄁e󠄁r󠄁y󠄁t󠄁h󠄁i󠄁n󠄁g󠄁 i󠄁t󠄁 s󠄁t󠄁o󠄁r󠄁e󠄁d󠄁. P󠄁a󠄁i󠄁r󠄁 i󠄁t󠄁 w󠄁i󠄁t󠄁h󠄁 a󠄁 r󠄁u󠄁n󠄁b󠄁o󠄁o󠄁k󠄁 f󠄁o󠄁r󠄁 s󠄁t󠄁a󠄁r󠄁t󠄁i󠄁n󠄁g󠄁,󠄁 u󠄁s󠄁i󠄁n󠄁g󠄁 a󠄁n󠄁d󠄁 r󠄁e󠄁m󠄁o󠄁v󠄁i󠄁n󠄁g󠄁 t󠄁h󠄁e󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁.󠄁 D󠄁o󠄁 n󠄁o󠄁t󠄁 b󠄁u󠄁i󠄁l󠄁d󠄁 y󠄁o󠄁u󠄁r󠄁 m󠄁a󠄁i󠄁n󠄁 s󠄁e󠄁c󠄁r󠄁e󠄁t󠄁 s󠄁h󠄁a󠄁r󠄁i󠄁n󠄁g󠄁 w󠄁o󠄁r󠄁k󠄁f󠄁l󠄁o󠄁w󠄁 o󠄁n󠄁 i󠄁t󠄁;󠄁 f󠄁o󠄁r󠄁 a󠄁n󠄁 i󠄁n󠄁s󠄁t󠄁a󠄁n󠄁c󠄁e󠄁 y󠄁o󠄁u󠄁 k󠄁e󠄁e󠄁p󠄁 r󠄁u󠄁n󠄁n󠄁i󠄁n󠄁g󠄁,󠄁 s󠄁e󠄁e󠄁 [I󠄁m󠄁a󠄁g󠄁e󠄁s󠄁 a󠄁n󠄁d󠄁 v󠄁a󠄁r󠄁i󠄁a󠄁n󠄁t󠄁s󠄁](/en/install/images-and-variants).󠄁

2. **Implement Time-Based Restrictions**: If your use case allows, consider implementing time-based restrictions for accessing secrets, such as only during business hours.

3. **Geo-Fencing**: For highly sensitive operations, consider implementing geo-fencing to restrict access to secrets from specific geographic locations.

4. **Audit Trails**: Maintain detailed audit trails of secret creation and access attempts. This can be crucial for incident response and compliance requirements.

5. **Encryption at Rest**: While Onetime Secret handles encryption, for highly sensitive data, consider encrypting the content before creating the secret for an additional layer of protection.


## Incident response

This section outlines general security recommendations that may be helpful for your organization. These recommendations are not specific features of our service.

1. **Have a Plan**: Develop an incident response plan specific to your secret sharing processes. This should include steps for revoking access, notifying affected parties, and mitigating potential damage.

2. **Quick Action**: If you suspect a secret has been compromised, use Onetime Secret's burn feature immediately if the secret hasn't been viewed yet. If it has been viewed, take appropriate actions to mitigate any potential damage.

3. **Regular Security Reviews**: Periodically review your secret sharing practices and adjust your security measures as needed.

---

By following these best practices, you can significantly enhance the security of your secret sharing activities on Onetime Secret. Remember, security is an ongoing process, and staying vigilant is key to protecting your sensitive information.

For any security concerns or to report potential vulnerabilities, please contact our security team immediately at security@onetimesecret.com.
