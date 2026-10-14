export type Language = 'en' | 'pt-BR'
export type TranslationValues = Record<string, string | number>

export const studentTranslations: Record<string, string> = {
  'YOUR SESSION, ONE SHARED SPACE': 'SUA SESSÃO, UM ESPAÇO COMPARTILHADO',
  'A meeting link for your circle': 'Um link de reunião para seu grupo',
  'Fictional meeting · Demo only': 'Reunião fictícia · Apenas demonstração',
  'Preview a Google Meet-style room link and a member-email allowlist for this session. No real room or invitations are created.':
    'Veja um link de sala no estilo do Google Meet e uma lista de e-mails autorizados para esta sessão. Nenhuma sala real ou convite é criado.',
  'Generate demo meeting link': 'Gerar link de reunião fictício',
  'Demo link generated · Saved in this browser': 'Link fictício gerado · Salvo neste navegador',
  'Fictional meeting link': 'Link de reunião fictício',
  'Copy demo link': 'Copiar link fictício',
  'Copied demo link': 'Link fictício copiado',
  'Preview meeting': 'Prévia da reunião',
  'Hide meeting preview': 'Ocultar prévia da reunião',
  'Clipboard unavailable. Select the link and copy it manually.':
    'Área de transferência indisponível. Selecione o link e copie manualmente.',
  'Meeting preview — not a live call': 'Prévia de reunião — não é uma chamada ao vivo',
  'This room is fictional. Previewing it stays inside Sorora; no video call starts and no data is sent to Google.':
    'Esta sala é fictícia. A prévia fica dentro da Sorora; nenhuma videochamada é iniciada e nenhum dado é enviado ao Google.',
  'Illustrative member allowlist · {count} emails':
    'Lista ilustrativa de participantes autorizadas · {count} e-mails',
  'Fictional email': 'E-mail fictício',
  'These emails illustrate who would be allowed. They are not real addresses, no invitations are sent, and no access restrictions are enforced.':
    'Estes e-mails ilustram quem teria acesso. Não são endereços reais, nenhum convite é enviado e nenhuma restrição de acesso é aplicada.',
  'Simulation only — not connected to Google Meet. A real integration needs Google authorization and supported host/access settings; an invitation list alone does not enforce access.':
    'Apenas simulação — sem conexão com o Google Meet. Uma integração real exige autorização do Google e configurações compatíveis de anfitrião e acesso; uma lista de convites, por si só, não restringe o acesso.',
  'No exact match, but a few nearby possibilities.':
    'Nenhum horário exato, mas algumas opções próximas.',
  'These pods meet on your preferred day, up to two hours earlier or later. Choose a time only if it works for you.':
    'Estes grupos se reúnem no dia escolhido, até duas horas antes ou depois. Escolha um horário apenas se funcionar para você.',
  'Same subject, nearby times': 'Mesma disciplina, horários próximos',
  'Alternative times · Not exact matches':
    'Horários alternativos · Não são correspondências exatas',
  'NEARBY TIME': 'HORÁRIO PRÓXIMO',
  'Same preferred day': 'Mesmo dia de preferência',
  '{count} min earlier': '{count} min antes',
  '{count} min later': '{count} min depois',
  'Suggested time: {time} · {difference}': 'Horário sugerido: {time} · {difference}',
  'Choose this time': 'Escolher este horário',
  'Confirm alternative time': 'Confirmar horário alternativo',
  'DOES THIS TIME WORK FOR YOU?': 'ESTE HORÁRIO FUNCIONA PARA VOCÊ?',
  'A nearby time, your choice.': 'Um horário próximo, você escolhe.',
  'You requested {day} at {preferred}. {name} meets at {actual} on the same day ({timezone}). Joining updates your preferred time; the pod schedule does not change.':
    'Você escolheu {day} às {preferred}. O grupo {name} se reúne às {actual} no mesmo dia ({timezone}). Ao entrar, seu horário de preferência será atualizado; a agenda do grupo não muda.',
  'Keep my preferred time': 'Manter meu horário',
  'Accept time and join': 'Aceitar horário e participar',
  'Nearby suggestions keep your university, course, preferred day, and available seats. Times differ by up to two hours; you must accept the new time before joining.':
    'As sugestões mantêm sua universidade, disciplina, dia de preferência e vagas disponíveis. Os horários variam em até duas horas; você precisa aceitar o novo horário antes de participar.',
  Language: 'Idioma',
  English: 'Inglês',
  'Português (Brasil)': 'Português (Brasil)',
  'Switch to dark theme': 'Ativar tema escuro',
  'Switch to light theme': 'Ativar tema claro',
  'Illustration of a shared study table, notebooks, and a growing plant':
    'Ilustração de uma mesa de estudos compartilhada, cadernos e uma planta crescendo',
  'small steps,': 'pequenos passos,',
  'big ideas.': 'grandes ideias.',
  'There’s room for you here.': 'Aqui tem lugar para você.',
  'A little preview of a bigger possibility': 'Uma pequena prévia de uma grande possibilidade',
  '· Fictional university & students': '· Universidade e estudantes fictícios',
  'Demo view': 'Visualização da demonstração',
  'Student view': 'Visão da estudante',
  'University view': 'Visão da universidade',
  'Reset demo': 'Reiniciar demonstração',
  'Sorora home': 'Página inicial da Sorora',
  'Grow together.': 'Cresçam juntas.',
  'For women in STEM': 'Para mulheres em STEM',
  'For universities': 'Para universidades',
  'University demo program': 'Programa universitário de demonstração',
  'YOUR PROGRAM': 'SEU PROGRAMA',
  'YOUR SPACE': 'SEU ESPAÇO',
  'Program overview': 'Visão geral do programa',
  'Find a study pod': 'Encontrar um grupo de estudos',
  'My study pod': 'Meu grupo de estudos',
  'My progress': 'Meu progresso',
  'Good things grow': 'Coisas boas crescem',
  'in good company.': 'em boa companhia.',
  'One circle. One step at a time.': 'Um grupo. Um passo de cada vez.',
  'Program showcase': 'Apresentação do programa',
  'Read-only · Sample data': 'Somente leitura · Dados de exemplo',
  'Sponsored student access': 'Acesso patrocinado para estudantes',
  'University program': 'Programa universitário',
  'Your university, your community.': 'Sua universidade, sua comunidade.',
  'University sponsored': 'Patrocinado pela universidade',
  'Find a pod': 'Encontrar um grupo',
  'My pod': 'Meu grupo',
  Progress: 'Progresso',
  'Browser storage is unavailable. Your demo works, but changes won’t survive a reload.':
    'O armazenamento do navegador está indisponível. A demonstração funciona, mas as alterações serão perdidas ao recarregar.',
  'You already have a circle, or this pod is no longer available. Visit your pod to continue.':
    'Você já tem um grupo, ou este grupo não está mais disponível. Acesse seu grupo para continuar.',
  'Find and join a circle to open your community.':
    'Encontre e participe de um grupo para acessar sua comunidade.',
  'Sorora · Grow together.': 'Sorora · Cresçam juntas.',
  'Frontend demo · All people and programs are fictional':
    'Demonstração de interface · Todas as pessoas e programas são fictícios',
  'INSTITUTION-SPONSORED ACCESS': 'ACESSO PATROCINADO PELA INSTITUIÇÃO',
  'You’re in good company.': 'Você está em boa companhia.',
  'Enter your university’s sponsored study community. No personal registration. No student payment.':
    'Entre na comunidade de estudos patrocinada pela sua universidade. Sem cadastro pessoal. Sem pagamento da estudante.',
  'Participating institution': 'Instituição participante',
  'Northbridge University — Demo program': 'Universidade Northbridge — Programa de demonstração',
  'Northbridge University': 'Universidade Northbridge',
  'Your place is sponsored.': 'Sua vaga é patrocinada.',
  'Fictional Women in STEM peer-support program':
    'Programa fictício de apoio entre mulheres em STEM',
  'Continue with Northbridge (Demo)': 'Continuar com Northbridge (Demonstração)',
  'Demo access — institution verification simulated. No real authentication, gender, or eligibility checks.':
    'Acesso de demonstração — verificação institucional simulada. Sem autenticação real nem verificação de gênero ou elegibilidade.',
  'A FRESH START': 'UM NOVO COMEÇO',
  'Ready for another take?': 'Pronta para tentar de novo?',
  'This resets Zoe’s preferences, pod membership, and session progress in this browser. The sample university dashboard stays the same.':
    'Isso reinicia as preferências, a participação no grupo e o progresso das sessões de Zoe neste navegador. O painel universitário de exemplo permanece igual.',
  'Keep exploring': 'Continuar explorando',
  'Close dialog': 'Fechar janela',
  'Your place, sponsored by your university': 'Sua vaga, patrocinada pela sua universidade',
  'Study together.': 'Estudem juntas.',
  'Belong together.': 'Encontre seu lugar.',
  'A study community for women in STEM,': 'Uma comunidade de estudos para mulheres em STEM,',
  'made accessible through your university.': 'acessível por meio da sua universidade.',
  'Find your people in a small study pod. Work through the tough bits, build confidence, and grow together — week after week.':
    'Encontre sua turma em um pequeno grupo de estudos. Juntas, vocês superam desafios, ganham confiança e crescem — semana após semana.',
  'Find my study pod': 'Encontrar meu grupo de estudos',
  'Access provided by participating universities':
    'Acesso oferecido pelas universidades participantes',
  'Small circles. Real connection.': 'Pequenos grupos. Conexões de verdade.',
  '4–5 peers · One shared subject · A weekly rhythm':
    '4–5 colegas · Uma disciplina em comum · Um ritmo semanal',
  'A SPACE TO FIGURE IT OUT, TOGETHER': 'UM ESPAÇO PARA DESCOBRIR JUNTAS',
  'Your kind of circle': 'Um grupo com a sua cara',
  'Different perspectives. Shared breakthroughs.':
    'Perspectivas diferentes. Descobertas compartilhadas.',
  'One seat for you': 'Uma vaga para você',
  'You don’t have to do STEM alone.': 'Você não precisa trilhar o caminho em STEM sozinha.',
  'A LITTLE STRUCTURE.': 'UM POUCO DE ESTRUTURA.',
  'A LOT OF SUPPORT.': 'MUITO APOIO.',
  'Find your circle': 'Encontre seu grupo',
  'Your course, your availability.': 'Sua disciplina, sua disponibilidade.',
  'Peers facing the same challenges.': 'Colegas enfrentando os mesmos desafios.',
  'Make room for progress': 'Abra espaço para o progresso',
  'A guided weekly session.': 'Uma sessão semanal guiada.',
  'Small goals you can actually reach.': 'Pequenas metas que você pode alcançar.',
  'Grow a sense of belonging': 'Cultive o sentimento de pertencimento',
  'Show up for yourself.': 'Esteja presente por você.',
  'Find people who show up for you.': 'Encontre pessoas que estejam presentes por você.',
  'Northbridge University · Fictional partner program':
    'Universidade Northbridge · Programa parceiro fictício',
  'See the university perspective': 'Veja a perspectiva da universidade',
  'Demo only · No real verification': 'Apenas demonstração · Sem verificação real',
  'YOUR CIRCLE STARTS HERE': 'SEU GRUPO COMEÇA AQUI',
  'Let’s find your people, {name}.': 'Vamos encontrar sua turma, {name}.',
  'A shared subject. A time that works. A small circle to grow with.':
    'Uma disciplina em comum. Um horário que funciona. Um pequeno grupo para crescer juntas.',
  'A little about your study rhythm': 'Um pouco sobre seu ritmo de estudos',
  'We’ll match you with available pods at your university.':
    'Vamos encontrar grupos disponíveis na sua universidade.',
  'Demo program': 'Programa de demonstração',
  'First name': 'Primeiro nome',
  'Your subject': 'Sua disciplina',
  'Where are you starting?': 'Qual é seu ponto de partida?',
  Beginner: 'Iniciante',
  Intermediate: 'Intermediário',
  'There’s no “behind” here.': 'Aqui ninguém está “atrasada”.',
  'Just your next step.': 'Só existe seu próximo passo.',
  'Preferred day': 'Dia de preferência',
  'Preferred time': 'Horário de preferência',
  'All pod times in {timezone}': 'Todos os horários dos grupos em {timezone}',
  'One thing you’d like to work on': 'Algo em que você gostaria de trabalhar',
  '(optional)': '(opcional)',
  'e.g. Feel more confident with derivatives': 'Ex.: Sentir mais confiança com derivadas',
  'Feel more confident with derivatives': 'Sentir mais confiança com derivadas',
  'Saved only in this browser': 'Salvo apenas neste navegador',
  'Find a group': 'Encontrar um grupo',
  'You’ve already joined a pod. Browsing won’t change your membership.':
    'Você já participa de um grupo. Explorar as opções não altera sua participação.',
  'Not another group.': 'Não é só mais um grupo.',
  'Your group.': 'É o seu grupo.',
  'We look for the things that make showing up easier.':
    'Buscamos o que facilita sua participação.',
  'The same subject': 'A mesma disciplina',
  'Start with something in common.': 'Comece com algo em comum.',
  'A compatible schedule': 'Horários compatíveis',
  'Build a rhythm you can keep.': 'Crie um ritmo que você consegue manter.',
  'Room at the table': 'Um lugar à mesa',
  'Small pods, with a seat for you.': 'Pequenos grupos, com uma vaga para você.',
  'Institution verification is simulated. No gender or eligibility checks are performed.':
    'A verificação institucional é simulada. Não há verificação de gênero ou elegibilidade.',
  'GOOD COMPANY, GOOD POSSIBILITIES': 'BOA COMPANHIA, BOAS POSSIBILIDADES',
  'Your next chapter starts with a circle.': 'Seu próximo capítulo começa com um grupo.',
  'Your circle is still taking shape.': 'Seu grupo ainda está tomando forma.',
  '{count} compatible study pods. A shared starting point, not a one-size-fits-all match.':
    '{count} grupos de estudos compatíveis. Um ponto de partida em comum, não uma solução única para todas.',
  'No available pods match this exact course and time. Let’s try a different study rhythm.':
    'Nenhum grupo disponível corresponde a esta disciplina e horário. Vamos tentar outro ritmo de estudos.',
  'Edit preferences': 'Editar preferências',
  'You already belong to a circle.': 'Você já faz parte de um grupo.',
  'Visit my pod': 'Visitar meu grupo',
  'A few places you could belong': 'Alguns lugares onde você pode se encontrar',
  'Matching on course, schedule & available seats':
    'Compatibilidade por disciplina, horário e vagas disponíveis',
  'YOUR CLOSEST FIT': 'MAIOR COMPATIBILIDADE',
  'A COMPATIBLE CIRCLE': 'UM GRUPO COMPATÍVEL',
  members: 'integrantes',
  'You’re in this circle': 'Você está neste grupo',
  '{count} seat open': '{count} vaga disponível',
  '{count} seats open': '{count} vagas disponíveis',
  'WHY THIS WORKS FOR YOU': 'POR QUE ESTE GRUPO COMBINA COM VOCÊ',
  'Your course: {course}': 'Sua disciplina: {course}',
  'Fits your {day} rhythm': 'Combina com seu ritmo de {day}',
  'A shared starting level': 'Um nível inicial em comum',
  'A different level, a shared subject': 'Um nível diferente, uma disciplina em comum',
  'Open my pod': 'Abrir meu grupo',
  'Already in another pod': 'Você já está em outro grupo',
  'Join pod': 'Participar do grupo',
  'Thoughtful matches, not magic. We only show pods at your university with the same course, exact day and time, and an open seat. Level helps order your options.':
    'Compatibilidade com cuidado, não mágica. Mostramos apenas grupos da sua universidade com a mesma disciplina, dia e horário exatos e uma vaga disponível. O nível ajuda a ordenar as opções.',
  'No match doesn’t mean no place for you.':
    'Não encontrar um grupo não significa que não há lugar para você.',
  'Try Calculus I on Wednesday at 18:00 to explore the seeded circles.':
    'Experimente Cálculo I na quarta-feira às 18:00 para explorar os grupos de exemplo.',
  'We won’t suggest a full pod or a time that doesn’t work for you.':
    'Não vamos sugerir um grupo lotado ou um horário que não funcione para você.',
  'Change availability': 'Alterar disponibilidade',
  'YOUR SMALL CORNER OF CAMPUS': 'SEU CANTINHO NO CAMPUS',
  'A recurring space to study, share, and grow. You’re part of the circle now.':
    'Um espaço recorrente para estudar, compartilhar e crescer. Agora você faz parte do grupo.',
  'You’re a member · {count}/{capacity}': 'Você faz parte · {count}/{capacity}',
  '{day}s · {time}': 'Semanalmente: {day} · {time}',
  'A NOTE FOR YOUR FIRST DAY': 'UMA MENSAGEM PARA SEU PRIMEIRO DIA',
  'Welcome to the circle, {name}.': 'Boas-vindas ao grupo, {name}.',
  'You don’t need to have every answer. Bring your questions, your perspective, and yourself. We’ll work through the rest together.':
    'Você não precisa ter todas as respostas. Traga suas dúvidas, sua perspectiva e seja você mesma. Vamos resolver o resto juntas.',
  'KEEP YOUR RHYTHM': 'MANTENHA SEU RITMO',
  'YOUR NEXT STUDY SESSION': 'SUA PRÓXIMA SESSÃO DE ESTUDOS',
  'Next week': 'Na próxima semana',
  '45 minutes · Guided': '45 minutos · Guiada',
  'One shared challenge. A little structure. Plenty of space for questions.':
    'Um desafio compartilhado. Um pouco de estrutura. Muito espaço para perguntas.',
  '{day} at {time}': '{day} às {time}',
  'Weekly · {timezone} · Demo session': 'Semanal · {timezone} · Sessão de demonstração',
  'Check in': 'Conectar',
  'Share questions': 'Compartilhar dúvidas',
  'Study together': 'Estudar juntas',
  'Reflect & grow': 'Refletir e crescer',
  '{count} min': '{count} min',
  'A small win, a stronger connection.': 'Uma pequena conquista, uma conexão mais forte.',
  'Show up as you are. Learn as a circle.': 'Venha como você é. Aprenda em grupo.',
  'View my progress': 'Ver meu progresso',
  'Start guided session': 'Iniciar sessão guiada',
  'A little connection goes a long way.': 'Um pouco de conexão faz toda a diferença.',
  'Fictional peer notes': 'Mensagens fictícias de colegas',
  'What do you need help with this week?': 'Com o que você precisa de ajuda nesta semana?',
  '“I know the rules, but I get stuck choosing which one to use. Anyone else?”':
    '“Conheço as regras, mas travo na hora de escolher qual usar. Mais alguém?”',
  '{name} · Sample prompt response': '{name} · Resposta de exemplo',
  'What can you help someone with?': 'Com o que você pode ajudar alguém?',
  '“Happy to walk through an example slowly. Explaining it helps me learn too.”':
    '“Posso explicar um exemplo com calma. Explicar também me ajuda a aprender.”',
  'Your people': 'Sua turma',
  'Different perspectives. Same team.': 'Perspectivas diferentes. A mesma equipe.',
  you: 'você',
  'Fictional demo community': 'Comunidade fictícia de demonstração',
  'YOUR SMALL, MEANINGFUL GOAL': 'SUA PEQUENA META SIGNIFICATIVA',
  'Make progress, one question at a time.': 'Avance, uma pergunta de cada vez.',
  'No need to do it all today.': 'Não precisa fazer tudo hoje.',
  'Just take your next step.': 'Só dê seu próximo passo.',
  '1 session completed': '1 sessão concluída',
  'Your first session awaits': 'Sua primeira sessão espera por você',
  'Back to {name}': 'Voltar para {name}',
  'MAKE PROGRESS TOGETHER': 'AVANCEM JUNTAS',
  'A little structure. A shared breakthrough.':
    'Um pouco de estrutura. Uma descoberta compartilhada.',
  '{name} · {course} · A 45-minute guided study session':
    '{name} · {course} · Uma sessão guiada de estudos de 45 minutos',
  'Self-paced demo': 'Demonstração no seu ritmo',
  'Today’s rhythm': 'O ritmo de hoje',
  '45 min': '45 min',
  '{count} minutes · {label}': '{count} minutos · {label}',
  '{count} of 4 steps complete': '{count} de 4 etapas concluídas',
  'Session steps completed': 'Etapas da sessão concluídas',
  'Your answers stay in this browser. University coordinators never see individual reflections.':
    'Suas respostas ficam neste navegador. A coordenação da universidade nunca vê reflexões individuais.',
  'STEP {count} OF 4 · {label}': 'ETAPA {count} DE 4 · {label}',
  '{count} min suggested': '{count} min sugeridos',
  'YOUR SHARED CHALLENGE': 'SEU DESAFIO COMPARTILHADO',
  'A MOMENT FOR YOU': 'UM MOMENTO PARA VOCÊ',
  'Choose one {course} problem you’d like to understand, and walk through it together.':
    'Escolha um problema de {course} que gostaria de entender e resolvam juntas.',
  'Hide worked example': 'Ocultar exemplo resolvido',
  'Reveal a worked example': 'Mostrar um exemplo resolvido',
  'Differentiate the outer power: 4(3x² + 1)³. Multiply by the derivative of the inside, 6x. What helped you decide to use the chain rule?':
    'Derive a potência externa: 4(3x² + 1)³. Multiplique pela derivada interna, 6x. O que ajudou você a decidir usar a regra da cadeia?',
  'Choose a next-week goal, or write your own below':
    'Escolha uma meta para a próxima semana ou escreva a sua abaixo',
  'Choose a response to make this step yours': 'Escolha uma resposta para personalizar esta etapa',
  'A small win or a personal next step': 'Uma pequena conquista ou um próximo passo pessoal',
  'I asked for help today instead of staying stuck…':
    'Hoje pedi ajuda em vez de continuar travada…',
  'Private to this browser · {count}/400': 'Privado neste navegador · {count}/400',
  'Step completed': 'Etapa concluída',
  'No timer. Go at your own pace.': 'Sem cronômetro. Siga no seu ritmo.',
  Continue: 'Continuar',
  'Complete this step': 'Concluir esta etapa',
  'You showed up. That matters.': 'Você esteve presente. Isso importa.',
  'Save your session and see your progress.': 'Salve sua sessão e veja seu progresso.',
  'Finish session': 'Finalizar sessão',
  'This is a guided personal walkthrough, not a live group call. No responses are sent to other people.':
    'Este é um percurso pessoal guiado, não uma chamada em grupo ao vivo. Nenhuma resposta é enviada a outras pessoas.',
  'SMALL STEPS COUNT': 'PEQUENOS PASSOS IMPORTAM',
  'You made progress. Together.': 'Vocês avançaram. Juntas.',
  'Every journey starts with showing up.': 'Toda jornada começa com a presença.',
  'One session, a little more clarity, and a circle to come back to.':
    'Uma sessão, um pouco mais de clareza e um grupo para o qual voltar.',
  'Your progress will grow here, one meaningful study session at a time.':
    'Seu progresso vai crescer aqui, uma sessão significativa de cada vez.',
  'Session complete': 'Sessão concluída',
  'Your next chapter': 'Seu próximo capítulo',
  'A small win worth noticing.': 'Uma pequena conquista que merece atenção.',
  'Your first small win is ahead.': 'Sua primeira pequena conquista está por vir.',
  'You showed up for yourself and your circle, {name}. That’s a strong place to start.':
    'Você esteve presente por você e pelo seu grupo, {name}. É um ótimo começo.',
  'A question asked. A concept understood. A little encouragement shared. That’s what progress looks like here.':
    'Uma pergunta feita. Um conceito compreendido. Um incentivo compartilhado. É assim que o progresso acontece aqui.',
  'session completed': 'sessão concluída',
  'guided steps taken': 'etapas guiadas realizadas',
  'supportive circle': 'grupo de apoio',
  'Back to my circle': 'Voltar ao meu grupo',
  'YOUR NEXT-WEEK INTENTION': 'SUA INTENÇÃO PARA A PRÓXIMA SEMANA',
  'ROOM TO GROW': 'ESPAÇO PARA CRESCER',
  'Start where you are.': 'Comece de onde você está.',
  'Private to this browser, never in admin views':
    'Privado neste navegador, nunca na visão administrativa',
  'Keep a little room for next week.': 'Reserve um espaço para a próxima semana.',
  '{name} meets {day}s at {time} ({timezone}). Bring a question. Bring yourself.':
    'O grupo {name} se reúne semanalmente: {day}, às {time} ({timezone}). Traga uma pergunta. Venha como você é.',
  'Find a recurring study circle that fits your week.':
    'Encontre um grupo recorrente de estudos que combine com sua semana.',
  'Start your first session': 'Iniciar sua primeira sessão',
  'Study support + human connection': 'Apoio nos estudos + conexão humana',
  'No leaderboards. No pressure to keep a streak.':
    'Sem rankings. Sem pressão para manter uma sequência.',
  'Just a little progress, with people on your side.':
    'Só um pouco de progresso, com pessoas ao seu lado.',
  'Calculus I': 'Cálculo I',
  'Intro to Programming': 'Introdução à Programação',
  'Physics I': 'Física I',
  'Organic Chemistry': 'Química Orgânica',
  Monday: 'Segunda-feira',
  Tuesday: 'Terça-feira',
  Wednesday: 'Quarta-feira',
  Thursday: 'Quinta-feira',
  Friday: 'Sexta-feira',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
  'Calculus Circle': 'Círculo de Cálculo',
  'The Derivative Collective': 'Coletivo das Derivadas',
  Limitless: 'Sem Limites',
  'Code Companions': 'Companheiras de Código',
  'The Motion Club': 'Clube do Movimento',
  'Good Chemistry': 'Boa Química',
  'Friday Foundations': 'Fundamentos de Sexta',
  'Problem Solvers': 'Solucionadoras de Problemas',
  'Small steps, shared breakthroughs. A friendly space to make calculus click.':
    'Pequenos passos, descobertas compartilhadas. Um espaço acolhedor para entender cálculo.',
  'Turn tricky practice problems into a weekly team effort.':
    'Transforme exercícios difíceis em um esforço semanal em equipe.',
  'Ask the small questions. Build a stronger foundation, together.':
    'Façam as pequenas perguntas. Construam uma base mais forte juntas.',
  'Work through loops, functions, and your first little breakthroughs.':
    'Explore laços, funções e suas primeiras pequenas descobertas.',
  'Bring your diagrams and your questions. We’ll figure out the forces.':
    'Traga seus diagramas e suas dúvidas. Vamos entender as forças.',
  'A supportive weekly circle for mechanisms and molecular puzzles.':
    'Um grupo semanal de apoio para mecanismos e desafios moleculares.',
  'End the week with clarity, confidence, and a few solved problems.':
    'Termine a semana com clareza, confiança e alguns problemas resolvidos.',
  'A close-knit study circle for first-year calculus.':
    'Um grupo unido de estudos de cálculo do primeiro ano.',
  'Making sense of derivatives': 'Entendendo as derivadas',
  'The chain rule, together': 'A regra da cadeia, juntas',
  'From limits to derivatives': 'Dos limites às derivadas',
  'Functions and friendly debugging': 'Funções e depuração em boa companhia',
  'Free-body diagrams': 'Diagramas de corpo livre',
  'Reaction mechanisms': 'Mecanismos de reação',
  'Derivative fundamentals': 'Fundamentos das derivadas',
  'Differentiation practice': 'Prática de derivação',
  'A little encouragement goes a long way': 'Um pouco de incentivo faz toda a diferença',
  'Practice makes progress': 'A prática traz progresso',
  'No question is too small': 'Nenhuma pergunta é pequena demais',
  'Learning line by line': 'Aprendendo linha por linha',
  'Find your momentum': 'Encontre seu impulso',
  'Better bonds, better study': 'Melhores ligações, melhores estudos',
  'Finish the week feeling good': 'Termine a semana se sentindo bem',
  'Every step counts': 'Cada passo conta',
  'Engineering · Year 1': 'Engenharia · 1º ano',
  'Mathematics · Year 1': 'Matemática · 1º ano',
  'Computer Science · Year 1': 'Ciência da Computação · 1º ano',
  'Physics · Year 1': 'Física · 1º ano',
  'Chemistry · Year 2': 'Química · 2º ano',
  'Your study circle': 'Seu grupo de estudos',
  'I can help with limits. Derivatives are my next challenge!':
    'Posso ajudar com limites. Derivadas são meu próximo desafio!',
  'Big fan of drawing a problem before solving it.':
    'Adoro desenhar um problema antes de resolvê-lo.',
  'Learning to ask questions, even the small ones.':
    'Aprendendo a fazer perguntas, até as pequenas.',
  'Here for steady progress and a little encouragement.':
    'Estou aqui para avançar com constância e um pouco de incentivo.',
  'One concept at a time. We have this.': 'Um conceito de cada vez. Vamos conseguir.',
  'Arrive & check in': 'Chegar e se conectar',
  CONNECT: 'CONECTAR',
  SHARE: 'COMPARTILHAR',
  STUDY: 'ESTUDAR',
  GROW: 'CRESCER',
  'Take a breath. Share how you’re arriving today, and one thing you’d like support with.':
    'Respire. Compartilhe como você está chegando hoje e algo em que gostaria de receber apoio.',
  'How are you feeling about this week’s material?':
    'Como você está se sentindo em relação ao conteúdo desta semana?',
  'Ready to give it a go': 'Pronta para tentar',
  'A little stuck, but here': 'Um pouco travada, mas presente',
  'Excited to help someone': 'Animada para ajudar alguém',
  'Exchange questions': 'Trocar perguntas',
  'Make space for everyone’s questions. Choose one challenge to work through as a circle.':
    'Abra espaço para as perguntas de todas. Escolha um desafio para resolver em grupo.',
  'Knowing when to use the chain rule': 'Saber quando usar a regra da cadeia',
  'Connecting graphs and derivatives': 'Relacionar gráficos e derivadas',
  'Breaking a problem into smaller steps': 'Dividir um problema em etapas menores',
  'Work it out together': 'Resolver juntas',
  'Try the problem on your own, compare your reasoning, then explain one step to a peer.':
    'Tente resolver por conta própria, compare seu raciocínio e explique uma etapa a uma colega.',
  'Try this: if f(x) = (3x² + 1)⁴, what is f′(x)?':
    'Experimente: se f(x) = (3x² + 1)⁴, qual é f′(x)?',
  'I tried it and compared my approach': 'Tentei resolver e comparei minha abordagem',
  'I explained a step to the circle': 'Expliquei uma etapa ao grupo',
  'I asked for help and worked through it': 'Pedi ajuda e consegui avançar',
  'Reflect & look ahead': 'Refletir e olhar adiante',
  'Notice a small win. Set one achievable goal to bring back to the circle next week.':
    'Reconheça uma pequena conquista. Defina uma meta alcançável para trazer ao grupo na próxima semana.',
  'What will you take into next week?': 'O que você vai levar para a próxima semana?',
  'Practice three chain-rule problems': 'Praticar três problemas de regra da cadeia',
  'Ask a question earlier instead of staying stuck':
    'Perguntar mais cedo em vez de continuar travada',
  'Explain a derivative problem to a peer': 'Explicar um problema de derivadas a uma colega',
}

export function translateWithDictionary(
  text: string,
  language: Language,
  dictionary: Record<string, string>,
  values?: TranslationValues,
): string {
  const translated =
    language === 'pt-BR' && Object.prototype.hasOwnProperty.call(dictionary, text)
      ? dictionary[text]
      : text
  return translated.replace(/\{(\w+)\}/g, (placeholder, key: string) =>
    values && Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : placeholder,
  )
}

export function translate(text: string, language: Language, values?: TranslationValues): string {
  return translateWithDictionary(text, language, studentTranslations, values)
}
