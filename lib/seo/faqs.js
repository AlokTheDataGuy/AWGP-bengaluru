/**
 * Multilingual FAQ content, keyed by page. Each answer opens with a direct,
 * self-contained lead sentence ("Yagya is …") so it works as a featured
 * snippet, an AI-overview answer, and a voice response — and renders as a
 * visible FAQ block (good UX) plus FAQPage JSON-LD (rich result).
 *
 * Resolve a set with getFaqs(key, locale).
 *
 * @typedef {{ q: import('./metadata').Localized, a: import('./metadata').Localized }} FaqItem
 */

import { pick } from './metadata';

/** @type {Record<string, FaqItem[]>} */
export const FAQ_CONTENT = {
  home: [
    {
      q: {
        en: 'What is All World Gayatri Pariwar (AWGP) Bengaluru?',
        hi: 'अखिल विश्व गायत्री परिवार (AWGP) बेंगलूरु क्या है?',
        kn: 'ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ (AWGP) ಬೆಂಗಳೂರು ಎಂದರೇನು?',
      },
      a: {
        en: 'AWGP Bengaluru is a branch of the All World Gayatri Pariwar, Shantikunj-Haridwar (Uttarakhand) — the spiritual movement founded by Gurudev Shri Ram Sharma Acharya. Based in Begur, this Gayatri Chetna Kendra offers sanskars, yagya, yoga, dhyan, lectures and workshops, along with community activities like tree plantation, book exhibitions, food & cloth distribution and health camps.',
        hi: 'AWGP बेंगलूरु, अखिल विश्व गायत्री परिवार, शांतिकुंज-हरिद्वार (उत्तराखंड) की एक शाखा है — यह आध्यात्मिक आंदोलन गुरुदेव श्रीराम शर्मा आचार्य द्वारा स्थापित है। बेगूर स्थित यह गायत्री चेतना केंद्र संस्कार, यज्ञ, योग, ध्यान, प्रवचन एवं कार्यशालाओं के साथ वृक्षारोपण, पुस्तक प्रदर्शनी, अन्न एवं वस्त्र वितरण और स्वास्थ्य शिविर जैसी सामुदायिक गतिविधियां आयोजित करता है।',
        kn: 'AWGP ಬೆಂಗಳೂರು, ಅಖಿಲ ವಿಶ್ವ ಗಾಯತ್ರಿ ಪರಿವಾರ, ಶಾಂತಿಕುಂಜ-ಹರಿದ್ವಾರ (ಉತ್ತರಾಖಂಡ) ದ ಒಂದು ಶಾಖೆ — ಇದು ಗುರುದೇವ ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರಿಂದ ಸ್ಥಾಪಿತವಾದ ಆಧ್ಯಾತ್ಮಿಕ ಆಂದೋಲನ. ಬೇಗೂರಿನಲ್ಲಿರುವ ಈ ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರವು ಸಂಸ್ಕಾರ, ಯಜ್ಞ, ಯೋಗ, ಧ್ಯಾನ, ಪ್ರವಚನ ಮತ್ತು ಕಾರ್ಯಾಗಾರಗಳ ಜೊತೆಗೆ ವೃಕ್ಷಾರೋಪಣ, ಪುಸ್ತಕ ಪ್ರದರ್ಶನ, ಆಹಾರ ಮತ್ತು ವಸ್ತ್ರ ವಿತರಣೆ ಹಾಗೂ ಆರೋಗ್ಯ ಶಿಬಿರಗಳಂತಹ ಸಮುದಾಯ ಚಟುವಟಿಕೆಗಳನ್ನು ನಡೆಸುತ್ತದೆ.',
      },
    },
    {
      q: {
        en: 'Where is the Gayatri Pariwar centre in Bangalore located?',
        hi: 'बेंगलूरु में गायत्री परिवार केंद्र कहाँ स्थित है?',
        kn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಗಾಯತ್ರಿ ಪರಿವಾರ ಕೇಂದ್ರ ಎಲ್ಲಿದೆ?',
      },
      a: {
        en: 'The Gayatri Chetna Kendra is at 37, Lakshmi Layout Main Road, Chikka Begur, Begur, Bengaluru — 560114, off Hosur Road. The nearest Namma Metro stop is Kudlu Gate (Yellow Line), about a 10-minute walk away. It is open daily from 5:30 AM to 9:00 PM.',
        hi: 'गायत्री चेतना केंद्र 37, लक्ष्मी लेआउट मेन रोड, चिक्का बेगूर, बेगूर, बेंगलूरु — 560114 में, होसुर रोड के पास स्थित है। निकटतम नम्मा मेट्रो स्टेशन कुडलू गेट (येलो लाइन) है, जो लगभग 10 मिनट की पैदल दूरी पर है। केंद्र प्रतिदिन सुबह 5:30 से रात 9:00 बजे तक खुला रहता है।',
        kn: 'ಗಾಯತ್ರಿ ಚೇತನ ಕೇಂದ್ರವು 37, ಲಕ್ಷ್ಮಿ ಲೇಔಟ್ ಮುಖ್ಯ ರಸ್ತೆ, ಚಿಕ್ಕ ಬೇಗೂರು, ಬೇಗೂರು, ಬೆಂಗಳೂರು — 560114 ರಲ್ಲಿ, ಹೊಸೂರು ರಸ್ತೆಯ ಬಳಿ ಇದೆ. ಹತ್ತಿರದ ನಮ್ಮ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ ಕುಡ್ಲು ಗೇಟ್ (ಹಳದಿ ಮಾರ್ಗ), ಸುಮಾರು 10 ನಿಮಿಷ ನಡಿಗೆ. ಇದು ಪ್ರತಿದಿನ ಬೆಳಿಗ್ಗೆ 5:30 ರಿಂದ ರಾತ್ರಿ 9:00 ರವರೆಗೆ ತೆರೆದಿರುತ್ತದೆ.',
      },
    },
    {
      q: {
        en: 'Are the programs free to attend?',
        hi: 'क्या कार्यक्रमों में भाग लेना नि:शुल्क है?',
        kn: 'ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಭಾಗವಹಿಸುವುದು ಉಚಿತವೇ?',
      },
      a: {
        en: 'Yes. Every program at AWGP Bengaluru — meditation, Yagya, Pragya Yoga, satsang, workshops and Bal Sanskar Shala — is completely free and open to all, regardless of background. No registration fee is charged; the centre runs on selfless service (seva) and community participation.',
        hi: 'हाँ। AWGP बेंगलूरु के सभी कार्यक्रम — ध्यान, यज्ञ, प्रज्ञायोग, सत्संग, कार्यशालाएं एवं बाल संस्कार शाला — पूर्णतः नि:शुल्क और सभी के लिए खुले हैं। कोई शुल्क नहीं लिया जाता; केंद्र निस्वार्थ सेवा एवं सामुदायिक सहभागिता पर चलता है।',
        kn: 'ಹೌದು. AWGP ಬೆಂಗಳೂರಿನ ಎಲ್ಲಾ ಕಾರ್ಯಕ್ರಮಗಳು — ಧ್ಯಾನ, ಯಜ್ಞ, ಪ್ರಜ್ಞಾಯೋಗ, ಸತ್ಸಂಗ, ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ — ಸಂಪೂರ್ಣ ಉಚಿತ ಮತ್ತು ಎಲ್ಲರಿಗೂ ಮುಕ್ತ. ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ; ಕೇಂದ್ರವು ನಿಸ್ವಾರ್ಥ ಸೇವೆ ಮತ್ತು ಸಮುದಾಯ ಭಾಗವಹಿಸುವಿಕೆಯ ಮೇಲೆ ನಡೆಯುತ್ತದೆ.',
      },
    },
    {
      q: {
        en: 'How can I join, volunteer, or visit?',
        hi: 'मैं कैसे जुड़ूँ, सेवा करूँ या पधारूँ?',
        kn: 'ನಾನು ಹೇಗೆ ಸೇರಬಹುದು, ಸೇವೆ ಮಾಡಬಹುದು ಅಥವಾ ಭೇಟಿ ನೀಡಬಹುದು?',
      },
      a: {
        en: 'You can simply visit the kendra during opening hours, message us on WhatsApp at +91 92437 55613, or use the contact page to enquire about programs and volunteering. New visitors are always welcome — no prior experience or membership is required to begin sadhana or seva.',
        hi: 'आप खुलने के समय में केंद्र पधार सकते हैं, WhatsApp +91 92437 55613 पर संदेश भेज सकते हैं, या संपर्क पृष्ठ से कार्यक्रमों एवं सेवा के बारे में पूछ सकते हैं। नए आगंतुकों का सदैव स्वागत है — साधना या सेवा आरंभ करने के लिए किसी पूर्व अनुभव या सदस्यता की आवश्यकता नहीं है।',
        kn: 'ನೀವು ತೆರೆಯುವ ಸಮಯದಲ್ಲಿ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಬಹುದು, WhatsApp +91 92437 55613 ಗೆ ಸಂದೇಶ ಕಳುಹಿಸಬಹುದು, ಅಥವಾ ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ಕಾರ್ಯಕ್ರಮ ಮತ್ತು ಸೇವೆಯ ಬಗ್ಗೆ ವಿಚಾರಿಸಬಹುದು. ಹೊಸಬರಿಗೆ ಸದಾ ಸ್ವಾಗತ — ಸಾಧನೆ ಅಥವಾ ಸೇವೆ ಪ್ರಾರಂಭಿಸಲು ಯಾವುದೇ ಪೂರ್ವಾನುಭವ ಅಥವಾ ಸದಸ್ಯತ್ವ ಅಗತ್ಯವಿಲ್ಲ.',
      },
    },
  ],

  yagya: [
    {
      q: {
        en: 'What is Yagya (Havan)?',
        hi: 'यज्ञ (हवन) क्या है?',
        kn: 'ಯಜ್ಞ (ಹವನ) ಎಂದರೇನು?',
      },
      a: {
        en: 'Yagya, also called Havan, is the ancient Vedic ritual of offering herbal and aromatic substances into a sacred fire while chanting mantras. In the Gayatri Pariwar tradition it is both a spiritual sadhana and a process of physical and environmental purification — the fire carries subtle, medicinal vapours into the atmosphere for collective wellbeing.',
        hi: 'यज्ञ, जिसे हवन भी कहते हैं, एक प्राचीन वैदिक अनुष्ठान है जिसमें मंत्रोच्चार के साथ औषधीय एवं सुगंधित पदार्थों की पवित्र अग्नि में आहुति दी जाती है। गायत्री परिवार परंपरा में यह आध्यात्मिक साधना भी है और शारीरिक एवं पर्यावरणीय शुद्धि की प्रक्रिया भी — अग्नि सूक्ष्म, औषधीय वाष्प को वातावरण में फैलाकर सामूहिक कल्याण करती है।',
        kn: 'ಯಜ್ಞ, ಹವನ ಎಂದೂ ಕರೆಯಲ್ಪಡುವ, ಮಂತ್ರ ಪಠಣದೊಂದಿಗೆ ಔಷಧೀಯ ಮತ್ತು ಸುಗಂಧಿತ ಪದಾರ್ಥಗಳನ್ನು ಪವಿತ್ರ ಅಗ್ನಿಗೆ ಅರ್ಪಿಸುವ ಪ್ರಾಚೀನ ವೈದಿಕ ಆಚರಣೆ. ಗಾಯತ್ರಿ ಪರಿವಾರ ಪರಂಪರೆಯಲ್ಲಿ ಇದು ಆಧ್ಯಾತ್ಮಿಕ ಸಾಧನೆ ಮತ್ತು ದೈಹಿಕ ಹಾಗೂ ಪರಿಸರ ಶುದ್ಧೀಕರಣದ ಪ್ರಕ್ರಿಯೆ — ಅಗ್ನಿ ಸೂಕ್ಷ್ಮ, ಔಷಧೀಯ ಆವಿಯನ್ನು ವಾತಾವರಣಕ್ಕೆ ಹರಡಿ ಸಾಮೂಹಿಕ ಯೋಗಕ್ಷೇಮ ಮಾಡುತ್ತದೆ.',
      },
    },
    {
      q: {
        en: 'Can I take part in a Yagya in Bangalore?',
        hi: 'क्या मैं बेंगलूरु में यज्ञ में भाग ले सकता हूँ?',
        kn: 'ನಾನು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಯಜ್ಞದಲ್ಲಿ ಭಾಗವಹಿಸಬಹುದೇ?',
      },
      a: {
        en: 'Yes. AWGP Bengaluru holds regular Yagya at the Begur Chetna Kendra — on festivals, full-moon days, and family occasions such as birthdays and Sanskars. Everyone is welcome to take part. Contact us on WhatsApp at +91 92437 55613 for the next Yagya date or to request one for your family.',
        hi: 'हाँ। AWGP बेंगलूरु बेगूर चेतना केंद्र में नियमित यज्ञ आयोजित करता है — पर्वों, पूर्णिमा एवं जन्मदिन तथा संस्कार जैसे पारिवारिक अवसरों पर। इसमें सभी सादर आमंत्रित हैं। अगली यज्ञ तिथि या अपने परिवार के लिए यज्ञ हेतु WhatsApp +91 92437 55613 पर संपर्क करें।',
        kn: 'ಹೌದು. AWGP ಬೆಂಗಳೂರು ಬೇಗೂರು ಚೇತನ ಕೇಂದ್ರದಲ್ಲಿ ನಿಯಮಿತ ಯಜ್ಞಗಳನ್ನು ನಡೆಸುತ್ತದೆ — ಹಬ್ಬಗಳು, ಹುಣ್ಣಿಮೆ, ಮತ್ತು ಹುಟ್ಟುಹಬ್ಬ ಹಾಗೂ ಸಂಸ್ಕಾರಗಳಂತಹ ಕೌಟುಂಬಿಕ ಸಂದರ್ಭಗಳಲ್ಲಿ. ಎಲ್ಲರಿಗೂ ಭಾಗವಹಿಸಲು ಸ್ವಾಗತ. ಮುಂದಿನ ಯಜ್ಞ ದಿನಾಂಕ ಅಥವಾ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕಾಗಿ ಯಜ್ಞಕ್ಕೆ WhatsApp +91 92437 55613 ಗೆ ಸಂಪರ್ಕಿಸಿ.',
      },
    },
  ],

  meditation: [
    {
      q: {
        en: 'Are there free meditation classes in Bangalore?',
        hi: 'क्या बेंगलूरु में नि:शुल्क ध्यान कक्षाएं हैं?',
        kn: 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಉಚಿತ ಧ್ಯಾನ ತರಗತಿಗಳಿವೆಯೇ?',
      },
      a: {
        en: 'Yes. AWGP Bengaluru offers free guided meditation and Gayatri Sadhana sessions at its Begur centre, open to beginners and experienced practitioners alike. The practice combines breath awareness, mantra, and visualisation drawn from the Pragya Yoga system taught by Gurudev Shri Ram Sharma Acharya.',
        hi: 'हाँ। AWGP बेंगलूरु अपने बेगूर केंद्र में नि:शुल्क निर्देशित ध्यान एवं गायत्री साधना सत्र प्रदान करता है, जो नवसाधकों एवं अनुभवी साधकों दोनों के लिए खुले हैं। यह अभ्यास श्वास-जागरूकता, मंत्र एवं भावना का संगम है, जो गुरुदेव श्रीराम शर्मा आचार्य द्वारा सिखाई प्रज्ञायोग पद्धति पर आधारित है।',
        kn: 'ಹೌದು. AWGP ಬೆಂಗಳೂರು ತನ್ನ ಬೇಗೂರು ಕೇಂದ್ರದಲ್ಲಿ ಉಚಿತ ಮಾರ್ಗದರ್ಶಿತ ಧ್ಯಾನ ಮತ್ತು ಗಾಯತ್ರಿ ಸಾಧನಾ ಅವಧಿಗಳನ್ನು ನೀಡುತ್ತದೆ, ಆರಂಭಿಕರಿಗೆ ಮತ್ತು ಅನುಭವಿಗಳಿಗೆ ಮುಕ್ತ. ಈ ಅಭ್ಯಾಸವು ಗುರುದೇವ ಶ್ರೀರಾಮ ಶರ್ಮಾ ಆಚಾರ್ಯರು ಕಲಿಸಿದ ಪ್ರಜ್ಞಾಯೋಗ ಪದ್ಧತಿಯ ಶ್ವಾಸ-ಅರಿವು, ಮಂತ್ರ ಮತ್ತು ಭಾವನೆಯ ಸಂಗಮ.',
      },
    },
    {
      q: {
        en: 'What is Pragya Yoga?',
        hi: 'प्रज्ञायोग क्या है?',
        kn: 'ಪ್ರಜ್ಞಾಯೋಗ ಎಂದರೇನು?',
      },
      a: {
        en: 'Pragya Yoga is a simple sequence of yoga asanas synchronised with Gayatri Mantra and conscious breathing, designed by the Gayatri Pariwar to be accessible to people of every age and fitness level. It unites physical health, mental calm, and spiritual awareness in a single short daily practice.',
        hi: 'प्रज्ञायोग योगासनों का एक सरल क्रम है जो गायत्री मंत्र एवं सजग श्वास के साथ समन्वित है, जिसे गायत्री परिवार ने हर आयु एवं क्षमता के लोगों के लिए सुलभ बनाया है। यह शारीरिक स्वास्थ्य, मानसिक शांति एवं आध्यात्मिक जागरूकता को एक संक्षिप्त दैनिक अभ्यास में जोड़ता है।',
        kn: 'ಪ್ರಜ್ಞಾಯೋಗವು ಗಾಯತ್ರಿ ಮಂತ್ರ ಮತ್ತು ಜಾಗೃತ ಉಸಿರಾಟದೊಂದಿಗೆ ಸಂಯೋಜಿತವಾದ ಯೋಗಾಸನಗಳ ಸರಳ ಅನುಕ್ರಮ, ಇದನ್ನು ಗಾಯತ್ರಿ ಪರಿವಾರವು ಎಲ್ಲಾ ವಯಸ್ಸಿನ ಮತ್ತು ಸಾಮರ್ಥ್ಯದ ಜನರಿಗೆ ಸುಲಭವಾಗಿಸಿದೆ. ಇದು ದೈಹಿಕ ಆರೋಗ್ಯ, ಮಾನಸಿಕ ಶಾಂತಿ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಅರಿವನ್ನು ಒಂದು ಸಂಕ್ಷಿಪ್ತ ದೈನಂದಿನ ಅಭ್ಯಾಸದಲ್ಲಿ ಜೋಡಿಸುತ್ತದೆ.',
      },
    },
  ],

  sanskars: [
    {
      q: {
        en: 'What are the 16 Sanskars (Shodash Sanskar)?',
        hi: 'सोलह संस्कार (षोडश संस्कार) क्या हैं?',
        kn: 'ಹದಿನಾರು ಸಂಸ್ಕಾರಗಳು (ಷೋಡಶ ಸಂಸ್ಕಾರ) ಎಂದರೇನು?',
      },
      a: {
        en: 'Sanskars are the sacred Vedic rites that consecrate the milestones of life — from before birth through naming (Namkaran), first feeding (Annaprashan), sacred-thread (Yagyopavit), marriage (Vivah), and the final rites (Antyeshti). AWGP Bengaluru performs these Sanskars in a simple, scientific, and affordable form open to every family.',
        hi: 'संस्कार वे पवित्र वैदिक अनुष्ठान हैं जो जीवन के पड़ावों को संस्कारित करते हैं — जन्म से पूर्व से लेकर नामकरण, अन्नप्राशन, यज्ञोपवीत, विवाह एवं अंत्येष्टि तक। AWGP बेंगलूरु इन संस्कारों को सरल, वैज्ञानिक एवं सुलभ रूप में सम्पन्न कराता है, जो हर परिवार के लिए खुला है।',
        kn: 'ಸಂಸ್ಕಾರಗಳು ಜೀವನದ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಪವಿತ್ರಗೊಳಿಸುವ ವೈದಿಕ ಆಚರಣೆಗಳು — ಜನನಕ್ಕೆ ಮೊದಲಿನಿಂದ ನಾಮಕರಣ, ಅನ್ನಪ್ರಾಶನ, ಯಜ್ಞೋಪವೀತ, ವಿವಾಹ ಮತ್ತು ಅಂತ್ಯೇಷ್ಟಿಯವರೆಗೆ. AWGP ಬೆಂಗಳೂರು ಈ ಸಂಸ್ಕಾರಗಳನ್ನು ಸರಳ, ವೈಜ್ಞಾನಿಕ ಮತ್ತು ಕೈಗೆಟುಕುವ ರೂಪದಲ್ಲಿ ನೆರವೇರಿಸುತ್ತದೆ, ಪ್ರತಿ ಕುಟುಂಬಕ್ಕೂ ಮುಕ್ತ.',
      },
    },
  ],

  visit: [
    {
      q: {
        en: 'How do I reach AWGP Bengaluru by metro or bus?',
        hi: 'मैं मेट्रो या बस से AWGP बेंगलूरु कैसे पहुँचूँ?',
        kn: 'ಮೆಟ್ರೋ ಅಥವಾ ಬಸ್‌ನಲ್ಲಿ AWGP ಬೆಂಗಳೂರಿಗೆ ಹೇಗೆ ತಲುಪುವುದು?',
      },
      a: {
        en: 'Take the Namma Metro Yellow Line to Kudlu Gate station — the kendra is about a 10-minute walk from there. By bus, BMTC services on Hosur Road stop at Kudlu Gate. By car or auto, navigate to Lakshmi Layout Main Road, Chikka Begur; parking is available on the premises.',
        hi: 'नम्मा मेट्रो येलो लाइन से कुडलू गेट स्टेशन तक आएं — वहां से केंद्र लगभग 10 मिनट की पैदल दूरी पर है। बस से, होसुर रोड पर BMTC सेवाएं कुडलू गेट पर रुकती हैं। कार या ऑटो से, लक्ष्मी लेआउट मेन रोड, चिक्का बेगूर पहुँचें; परिसर में पार्किंग उपलब्ध है।',
        kn: 'ನಮ್ಮ ಮೆಟ್ರೋ ಹಳದಿ ಮಾರ್ಗದಲ್ಲಿ ಕುಡ್ಲು ಗೇಟ್ ನಿಲ್ದಾಣಕ್ಕೆ ಬನ್ನಿ — ಅಲ್ಲಿಂದ ಕೇಂದ್ರ ಸುಮಾರು 10 ನಿಮಿಷ ನಡಿಗೆ. ಬಸ್‌ನಲ್ಲಿ, ಹೊಸೂರು ರಸ್ತೆಯ BMTC ಸೇವೆಗಳು ಕುಡ್ಲು ಗೇಟ್‌ನಲ್ಲಿ ನಿಲ್ಲುತ್ತವೆ. ಕಾರು ಅಥವಾ ಆಟೋದಲ್ಲಿ, ಲಕ್ಷ್ಮಿ ಲೇಔಟ್ ಮುಖ್ಯ ರಸ್ತೆ, ಚಿಕ್ಕ ಬೇಗೂರಿಗೆ ಬನ್ನಿ; ಆವರಣದಲ್ಲಿ ಪಾರ್ಕಿಂಗ್ ಲಭ್ಯ.',
      },
    },
  ],
};

/**
 * Resolve a FAQ set for a page + locale into render-ready {question, answer}.
 * @param {keyof typeof FAQ_CONTENT} key
 * @param {string} locale
 * @returns {Array<{ question: string, answer: string }>}
 */
export function getFaqs(key, locale = 'en') {
  const set = FAQ_CONTENT[key];
  if (!set) return [];
  return set.map((item) => ({
    question: pick(item.q, locale),
    answer: pick(item.a, locale),
  }));
}

export default getFaqs;
