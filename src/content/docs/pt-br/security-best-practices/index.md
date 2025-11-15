---
title: Melhores Práticas de Segurança
description: Melhore a segurança do seu compartilhamento de mensagens com estas melhores práticas específicas do Onetime Secret, incluindo os benefícios de segurança dos Domínios Personalizados.
---

# Melhores Práticas de Segurança para o Onetime Secret

Embora o Onetime Secret seja projetado com segurança em mente, seguir essas melhores práticas pode melhorar ainda mais a proteção de suas informações sensíveis, especialmente ao usar recursos como Domínios Personalizados.

## Melhores Práticas para Compartilhamento de Mensagens

1. **Defina Tempos de Expiração Apropriados**: Escolha o menor tempo de expiração prático para suas mensagens. Isso minimiza a janela de oportunidade para acesso não autorizado.

2. **Use Proteção por Frase Secreta**: Para informações altamente sensíveis, use o recurso de proteção por frase secreta. Isso adiciona uma camada extra de segurança, exigindo que o destinatário insira uma frase secreta para visualizar a mensagem.

3. **Compartimentalize Informações Sensíveis**: Ao lidar com dados altamente sensíveis, considere dividi-los em múltiplas mensagens. Dessa forma, se uma mensagem for comprometida, o conjunto completo de informações permanece protegido.

4. **Use Canais Seguros para Compartilhar Metadados**: Embora o Onetime Secret proteja o conteúdo da sua mensagem, seja cuidadoso com a forma como você compartilha o link e quaisquer metadados associados (como frases secretas). Use canais seguros e criptografados para esta comunicação.

5. **Verifique o Destinatário**: Certifique-se de que está compartilhando mensagens com o destinatário pretendido. Verifique novamente endereços de e-mail ou nomes de usuário antes de enviar.

6. **Eduque os Usuários**: Se estiver usando o Onetime Secret dentro de uma organização, eduque sua equipe sobre uso adequado e práticas de segurança específicas para compartilhamento de mensagens.

## Benefícios de Segurança dos Domínios Personalizados

Usar Domínios Personalizados com o Onetime Secret oferece várias vantagens de segurança:

1. **Proteção Aprimorada Contra Phishing**: Com um domínio personalizado, seus usuários se acostumam a uma URL específica para compartilhamento de mensagens. Isso facilita a identificação de tentativas potenciais de phishing que podem usar domínios de aparência similar.

2. **Maior Confiança e Legitimidade**: Quando os destinatários veem um domínio familiar, é mais provável que confiem na fonte da mensagem. Isso é particularmente importante para empresas que compartilham informações sensíveis com clientes ou parceiros.

3. **Integração Perfeita com Infraestrutura de Segurança Existente**: Um domínio personalizado pode ser mais facilmente integrado com suas ferramentas de segurança e sistemas de monitoramento existentes, fornecendo uma visão mais abrangente das atividades de compartilhamento de mensagens da sua organização.

4. **Conformidade e Auditoria**: Para organizações em indústrias regulamentadas, usar um domínio personalizado pode ajudar a manter a conformidade mantendo as atividades de compartilhamento de mensagens sob controle direto da sua organização e tornando os processos de auditoria mais diretos.

O Onetime Secret cuida dos aspectos técnicos de proteger seu domínio personalizado, incluindo configuração SSL/TLS e monitoramento de atividade do domínio, permitindo que você se concentre nesses benefícios estratégicos de segurança.

## Segurança de Uso da API

Se você estiver usando a API do Onetime Secret:

1. **Proteja as Chaves de API**: Armazene as chaves de API com segurança e nunca as exponha em código do lado do cliente ou repositórios públicos.

2. **Rotacione as Chaves de API**: Rotacione regularmente suas chaves de API, especialmente se suspeitar que foram comprometidas.

3. **Limite o Acesso à API**: Use o princípio de menor privilégio ao configurar o acesso à API. Conceda apenas as permissões necessárias para cada caso de uso específico.

## Segurança Avançada de Auto-Hospedagem

Esta seção cobre considerações avançadas de segurança para organizações que executam sua própria instância do Onetime Secret. Você pode encontrar o projeto de código aberto no [GitHub](https://github.com/onetimesecret/onetimesecret) e imagens oficiais do Docker em [Docker Hub](https://hub.docker.com/r/onetimesecret/onetimesecret).

As recomendações abaixo podem ser implementadas no nível de sua infraestrutura ao auto-hospedar o Onetime Secret:

1. **Use Ambientes Efêmeros**: Quando possível, crie e destrua ambientes para cada sessão de compartilhamento de mensagens. Isso pode ser particularmente útil para operações altamente sensíveis. Nossa imagem Docker [Onetime Secret Lite](https://github.com/onetimesecret/onetimesecret/blob/v0.18.5/docs/DOCKER-lite.md) é projetada para casos de uso efêmeros.

2. **Implemente Restrições Baseadas em Tempo**: Se seu caso de uso permitir, considere implementar restrições baseadas em tempo para acessar mensagens, como apenas durante o horário comercial.

3. **Geo-Fencing**: Para operações altamente sensíveis, considere implementar geo-fencing para restringir o acesso a mensagens de localizações geográficas específicas.

4. **Trilhas de Auditoria**: Mantenha trilhas de auditoria detalhadas de criação de mensagens e tentativas de acesso. Isso pode ser crucial para resposta a incidentes e requisitos de conformidade.

5. **Criptografia em Repouso**: Embora o Onetime Secret cuide da criptografia, para dados altamente sensíveis, considere criptografar o conteúdo antes de criar a mensagem para uma camada adicional de proteção.

## Resposta a Incidentes

Esta seção descreve recomendações gerais de segurança que podem ser úteis para sua organização. Essas recomendações não são recursos específicos do nosso serviço.

1. **Tenha um Plano**: Desenvolva um plano de resposta a incidentes específico para seus processos de compartilhamento de mensagens. Isso deve incluir etapas para revogar acesso, notificar partes afetadas e mitigar danos potenciais.

2. **Ação Rápida**: Se suspeitar que uma mensagem foi comprometida, use imediatamente o recurso de queimar do Onetime Secret se a mensagem ainda não foi visualizada. Se já foi visualizada, tome as ações apropriadas para mitigar qualquer dano potencial.

3. **Revisões de Segurança Regulares**: Revise periodicamente suas práticas de compartilhamento de mensagens e ajuste suas medidas de segurança conforme necessário.

---

Ao seguir essas melhores práticas, você pode melhorar significativamente a segurança de suas atividades de compartilhamento de mensagens no Onetime Secret. Lembre-se, segurança é um processo contínuo, e permanecer vigilante é fundamental para proteger suas informações sensíveis.

Para quaisquer preocupações de segurança ou para relatar vulnerabilidades potenciais, entre em contato imediatamente com nossa equipe de segurança em security@onetimesecret.com.
