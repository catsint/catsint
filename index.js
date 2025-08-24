const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, ModalBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// Discord client configuration
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Configuration data
const ROLE_ID = '1408904851622203432';
const VERIFICATION_CHANNEL_ID = '1408903255618228375';
const BOT_TOKEN = 'MTQwNTY1NTUzMjIyMzcyNTU4OA.GZc-bp.EyTFHVxcfh1znPHZwjHyswbbwNigKwWHWGQU9s';
const OWNER_ID = '1392294451723894854'; // Replace with your Discord user ID

// Store math problems for users
const userMathProblems = new Map();
// Store verification messages sent to channels
const channelVerifications = new Map();

// Function to generate math problem
function generateMathProblem() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer;
    
    switch(operation) {
        case '+':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 + num2;
            break;
        case '-':
            num1 = Math.floor(Math.random() * 20) + 10;
            num2 = Math.floor(Math.random() * 10) + 1;
            answer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 5) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            answer = num1 * num2;
            break;
    }
    
    return {
        question: `${num1} ${operation} ${num2}`,
        answer: answer
    };
}

// Bot readiness handler
client.once('ready', () => {
    console.log(`✅ Bot ${client.user.tag} is online!`);
    console.log(`📊 Configuration:`);
    console.log(`   - Verification channel: ${VERIFICATION_CHANNEL_ID}`);
    console.log(`   - Role after verification: ${ROLE_ID}`);
    console.log(`   - Owner ID: ${OWNER_ID}`);

    // Register slash commands
    const commands = [
        new SlashCommandBuilder()
            .setName('website')
            .setDescription('Display website information (Owner only)')
    ].map(command => command.toJSON());

    // Set slash commands for all guilds
    client.guilds.cache.forEach(async guild => {
        try {
            await guild.commands.set(commands);
            console.log(`✅ Slash commands registered for guild: ${guild.name}`);
        } catch (error) {
            console.error(`❌ Error registering commands for ${guild.name}:`, error);
        }
    });
});

// Slash command handler
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // Handle /website command
    if (interaction.commandName === 'website') {
        // Check if user is the owner
        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: '❌ This command is only available for the server owner.',
                ephemeral: true
            });
        }

        // Create website embed
        const websiteEmbed = new EmbedBuilder()
            .setColor('#850e52')
            .setTitle('<a:gs_pink_hkheart:1409178843490680984> Official Website')
            .setDescription('Welcome to our official website! Here you can find all the information about our community, services, and more.')
            .setImage('https://cdn.discordapp.com/attachments/1405650092085477408/1408976499788484619/standard.gif?ex=68abb31f&is=68aa619f&hm=0cf183bbfa570c54f43df09d343e1a6356c051239444cae1528f7e847042aefc&')
            .setThumbnail('https://media.discordapp.net/attachments/1405650092085477408/1408935767404843100/Zrzut_ekranu_2025-08-23_172657-removebg-preview.png?ex=68ab8d2f&is=68aa3baf&hm=80e9234abfcaeb8e9e12bd2a6eb4bfc21ba7ee8cc2067fa1debc92e29e7ef406&=&format=webp&quality=lossless&width=612&height=524')
            .setAuthor({ 
                name: 'CATSINT.FUN Official', 
                iconURL: 'https://media.discordapp.net/attachments/1405650092085477408/1408935767404843100/Zrzut_ekranu_2025-08-23_172657-removebg-preview.png?ex=68ab8d2f&is=68aa3baf&hm=80e9234abfcaeb8e9e12bd2a6eb4bfc21ba7ee8cc2067fa1debc92e29e7ef406&=&format=webp&quality=lossless&width=612&height=524' 
            })
            .setFooter({ 
                text: 'Official Website • CATSINT.FUN', 
                iconURL: 'https://media.discordapp.net/attachments/1405650092085477408/1408935767404843100/Zrzut_ekranu_2025-08-23_172657-removebg-preview.png?ex=68ab8d2f&is=68aa3baf&hm=80e9234abfcaeb8e9e12bd2a6eb4bfc21ba7ee8cc2067fa1debc92e29e7ef406&=&format=webp&quality=lossless&width=612&height=524' 
            })
            .setTimestamp()
            .addFields({ 
                name: '<a:blad:1409178956824842390> Website Features', 
                value: '<a:gs_pink_stars:1409178867209601094> **Server Statistics** - Real-time analytics' 
            })
            .addFields({ 
                name: '<a:blad:1409178956824842390> Visit Our Website', 
                value: '🌐 **Website URL:** [CATSINT](https://catsint.fun)\n**Support Email:** support@catsint.fun\n🕒 **Available:** 24/7' 
            })
            .addFields({
                name: '<a:blad:1409178956824842390> About Us',
                value: 'CATSINT.FUN is a growing community dedicated to providing the best experience for our members. Our website offers seamless integration with Discord, advanced features, and a user-friendly interface.'
            });

        // Create website button
        const websiteButton = new ButtonBuilder()
            .setLabel('Visit Website')
            .setURL('https://catsint.fun')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder().addComponents(websiteButton);

        await interaction.reply({
            embeds: [websiteEmbed],
            components: [row]
        });

        console.log(`✅ Website command used by owner: ${interaction.user.tag}`);
    }
});

// Interaction handler (buttons)
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    
    // Handle verification button
    if (interaction.customId === 'start_verification') {
        // Generate math problem
        const mathProblem = generateMathProblem();
        
        // Store math problem for user
        userMathProblems.set(interaction.user.id, mathProblem.answer);
        
        // Create modal for answer input
        const modal = new ModalBuilder()
            .setCustomId('math_modal')
            .setTitle('Solve Math Problem');
        
        const mathInput = new TextInputBuilder()
            .setCustomId('math_input')
            .setLabel(`What is the answer to: ${mathProblem.question}?`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMinLength(1)
            .setMaxLength(3)
            .setPlaceholder('Enter the number answer');
        
        const actionRow = new ActionRowBuilder().addComponents(mathInput);
        modal.addComponents(actionRow);
        
        // Show the modal
        await interaction.showModal(modal);
    }
});

// Modal handler (forms)
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;
    
    if (interaction.customId === 'math_modal') {
        const userInput = interaction.fields.getTextInputValue('math_input');
        const storedAnswer = userMathProblems.get(interaction.user.id);
        
        // Convert to number for comparison
        const userAnswer = parseInt(userInput);
        
        if (!isNaN(userAnswer) && storedAnswer && userAnswer === storedAnswer) {
            // Correct answer
            userMathProblems.delete(interaction.user.id);
            
            // Assign verification role
            const role = interaction.guild.roles.cache.get(ROLE_ID);
            if (role) {
                try {
                    await interaction.member.roles.add(role);
                    await interaction.reply({
                        content: '✅ Verification completed successfully! You now have access to the server.',
                        ephemeral: true
                    });
                    console.log(`✅ User ${interaction.user.tag} successfully passed math verification`);
                } catch (error) {
                    console.error('❌ Error assigning role:', error);
                    await interaction.reply({
                        content: '✅ Verification correct, but there was a problem assigning the role. Please contact administration.',
                        ephemeral: true
                    });
                }
            } else {
                console.error(`❌ Role not found with ID: ${ROLE_ID}`);
                await interaction.reply({
                    content: '✅ Verification correct, but verification role was not found.',
                    ephemeral: true
                });
            }
        } else {
            // Incorrect answer
            await interaction.reply({
                content: '❌ Math answer is incorrect. Please try again by clicking the verification button.',
                ephemeral: true
            });
            console.log(`❌ User ${interaction.user.tag} entered incorrect math answer`);
        }
    }
});

// Message handler on verification channel
client.on('messageCreate', async message => {
    // Check if message is from bot
    if (message.author.bot) return;
    
    // Check if message is on verification channel
    if (message.channel.id === VERIFICATION_CHANNEL_ID) {
        // Check if verification message already sent to this channel
        if (!channelVerifications.has(message.channel.id)) {
            console.log(`📨 Sending verification message to channel: ${message.channel.name}`);
            
            try {
                // Create new verification embed
                const embed = new EmbedBuilder()
                    .setColor('#850e52')
                    .setTitle('<a:gs_pink_hkheart:1409178843490680984> Server Verification')
                    .setDescription('Welcome to CATSINT.FUN! To gain access to all channels and features, please complete the verification process by clicking the button below and solving the math problem.')
                    .setImage('https://cdn.discordapp.com/attachments/1405650092085477408/1408976499788484619/standard.gif?ex=68abb31f&is=68aa619f&hm=0cf183bbfa570c54f43df09d343e1a6356c051239444cae1528f7e847042aefc&')
                    .setThumbnail('https://media.discordapp.net/attachments/1405650092085477408/1408935767404843100/Zrzut_ekranu_2025-08-23_172657-removebg-preview.png?ex=68ab8d2f&is=68aa3baf&hm=80e9234abfcaeb8e9e12bd2a6eb4bfc21ba7ee8cc2067fa1debc92e29e7ef406&=&format=webp&quality=lossless&width=612&height=524')
                    .setAuthor({ 
                        name: 'Security System', 
                        iconURL: 'https://media.discordapp.net/attachments/1405650092085477408/1408935767404843100/Zrzut_ekranu_2025-08-23_172657-removebg-preview.png?ex=68ab8d2f&is=68aa3baf&hm=80e9234abfcaeb8e9e12bd2a6eb4bfc21ba7ee8cc2067fa1debc92e29e7ef406&=&format=webp&quality=lossless&width=612&height=524' 
                    })
                    .setFooter({ 
                        text: 'Verification Required • Server Protection Active', 
                        iconURL: 'https://media.discordapp.net/attachments/1405650092085477408/1408935767404843100/Zrzut_ekranu_2025-08-23_172657-removebg-preview.png?ex=68ab8d2f&is=68aa3baf&hm=80e9234abfcaeb8e9e12bd2a6eb4bfc21ba7ee8cc2067fa1debc92e29e7ef406&=&format=webp&quality=lossless&width=612&height=524' 
                    })
                    .setTimestamp()
                    .addFields({ 
                        name: '<a:blad:1409178956824842390> Verification Steps', 
                        value: ' <a:gs_pink_stars:1409178867209601094> 1. Click the "Verify Now" button\n <a:gs_pink_stars:1409178867209601094> 2. Solve the math problem\n <a:gs_pink_stars:1409178867209601094> 3. Get instant access to the server' 
                    })
                    .addFields({ 
                        name: '<a:blad:1409178956824842390> Math Verification', 
                        value: 'This simple math test helps us verify that you are human and not a bot.' 
                    });

                // Create gray button
                const button = new ButtonBuilder()
                    .setCustomId('start_verification')
                    .setLabel('Verify Now')
                    .setStyle(ButtonStyle.Secondary);
                
                const row = new ActionRowBuilder().addComponents(button);
                
                // Send message with embed and button
                await message.channel.send({
                    embeds: [embed],
                    components: [row]
                });
                
                console.log('✅ Verification message sent successfully!');
                
                // Mark channel as having verification
                channelVerifications.set(message.channel.id, true);
                
            } catch (error) {
                console.error('❌ Error sending message:', error);
            }
        }
        
        // Delete user message from verification channel
        try {
            await message.delete();
        } catch (error) {
            console.error('❌ Error deleting message:', error);
        }
    }
});

// Error handling
client.on('error', (error) => {
    console.error('❌ Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled error:', error);
});

// Login bot

client.login(BOT_TOKEN);
