import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Award, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

// Sample quiz data reflecting actual user levels
const quizData = {
    tr: [
        {
            question: "Aşağıdaki cümleyi tamamlayın: 'Ben Özbekistan'dan ___'",
            options: ["geliyorsun", "geliyorum", "geliyor", "geldik"],
            correct: 1
        },
        {
            question: "'Teşekkür ederim' ifadesine verilecek en uygun yanıt hangisidir?",
            options: ["Nasılsın", "Rica ederim", "Güle güle", "Günaydın"],
            correct: 1
        },
        {
            question: "Hangi kelime zaman bildirmez?",
            options: ["Dün", "Yarın", "Masa", "Şimdi"],
            correct: 2
        },
        {
            question: "'Çok ___ olduğum için bir bardak su içtim.' boşluğa ne gelmelidir?",
            options: ["susadığım", "acıktığım", "uyuduğum", "yorgun"],
            correct: 0
        },
        {
            question: "Aşağıdaki eşleşmelerden hangisi yanlıştır?",
            options: ["Kalem - Yazmak", "Kitap - Okumak", "Gözlük - Uyumak", "Araba - Sürmek"],
            correct: 2
        }
    ],
    uz: [
        {
            question: "Ushbu gapni to'ldiring: 'Ben Özbekistan'dan ___'",
            options: ["geliyorsun", "geliyorum", "geliyor", "geldik"],
            correct: 1
        },
        {
            question: "'Teşekkür ederim' (Rahmat) so'ziga eng mos javob qaysi?",
            options: ["Nasılsın", "Rica ederim", "Güle güle", "Günaydın"],
            correct: 1
        },
        {
            question: "Qaysi so'z vaqtni bildirmaydi?",
            options: ["Dün", "Yarın", "Masa", "Şimdi"],
            correct: 2
        },
        {
            question: "'Çok ___ olduğum için bir bardak su içtim.' (Juda ... bo'lganim uchun bir stakan suv ichdim). Bo'sh joyga nima kelishi kerak?",
            options: ["susadığım (chanqagan)", "acıktığım (och qolgan)", "uyuduğum (uxlagan)", "yorgun (charchagan)"],
            correct: 0
        },
        {
            question: "Quyidagi qaysi juftlik noto'g'ri?",
            options: ["Kalem - Yazmak (Ruchka - Yozmoq)", "Kitap - Okumak (Kitob - O'qimoq)", "Gözlük - Uyumak (Ko'zoynak - Uxlash)", "Araba - Sürmek (Mashina - Haydash)"],
            correct: 2
        }
    ]
};

const Quiz = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    
    const [currentStep, setCurrentStep] = useState('intro'); // intro, playing, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const questions = i18n.language === 'tr' ? quizData.tr : quizData.uz;

    const handleStart = () => {
        setCurrentStep('playing');
        setCurrentQuestion(0);
        setScore(0);
        setIsAnswered(false);
        setSelectedOption(null);
    };

    const handleAnswer = (index) => {
        if (isAnswered) return;
        
        setSelectedOption(index);
        setIsAnswered(true);
        
        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setCurrentStep('result');
        }
    };

    // Calculate level based on score
    const getLevel = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage <= 20) return { title: "A1 (Boshlang'ich / Başlangıç)", desc: i18n.language === 'tr' ? "Yolun başındasınız! Doğru eğitimle çok hızlı ilerleyebilirsiniz." : "Til o'rganishning boshidasiz. To'g'ri ta'lim bilan tez o'rganib olasiz." };
        if (percentage <= 60) return { title: "A2 (O'rta / Temel-Orta)", desc: i18n.language === 'tr' ? "Temeliniz var! Biraz pratikle akıcı konuşmaya başlayabilirsiniz." : "Baza bor! Ozgina amaliyot bilan erkin gapirishni boshlashingiz mumkin." };
        return { title: "B1+ (Yaxshi / İyi)", desc: i18n.language === 'tr' ? "Harika gidiyorsunuz! Akademik veya ileri seviye (TÖMER) kurslarımız tam size göre." : "Ajoyib natija! TÖMER tayyorgarligi va yuqori daraja darslarimiz siz uchun." };
    };

    return (
        <section className="bg-dark min-h-screen pt-32 pb-20 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
            <Helmet>
                <title>{t('quiz.title')} | Turk Dunyosi</title>
                <meta name="description" content={t('quiz.subtitle')} />
            </Helmet>

            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

            <div className="container relative z-10">
                <AnimatePresence mode="wait">
                    
                    {/* INTRO SCREEN */}
                    {currentStep === 'intro' && (
                        <motion.div 
                            key="intro"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="bg-white/5 border border-white/10 backdrop-blur-xl p-10 md:p-16 rounded-[40px] max-w-3xl mx-auto text-center shadow-2xl"
                        >
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <BookOpen className="w-12 h-12 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-md leading-tight">
                                {t('quiz.title')}
                            </h1>
                            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                                {t('quiz.subtitle')}
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                    onClick={handleStart}
                                    variant="primary" 
                                    className="px-12 py-5 text-xl font-bold shadow-[0_0_30px_rgba(227,10,23,0.4)]"
                                >
                                    {t('quiz.start')} <ChevronRight className="ml-2" />
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* PLAYING SCREEN */}
                    {currentStep === 'playing' && (
                        <motion.div 
                            key="playing"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="max-w-3xl mx-auto w-full"
                        >
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-gray-400 font-bold mb-3 text-sm tracking-widest uppercase">
                                    <span>{i18n.language === 'tr' ? 'Soru' : 'Savol'} {currentQuestion + 1} / {questions.length}</span>
                                    <span className="text-primary">{Math.round(((currentQuestion) / questions.length) * 100)}%</span>
                                </div>
                                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-primary"
                                        initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                                        animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                        transition={{ duration: 0.5 }}
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Question Box */}
                            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[30px] shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed">
                                    {questions[currentQuestion].question}
                                </h2>

                                <div className="space-y-4">
                                    {questions[currentQuestion].options.map((opt, idx) => {
                                        
                                        // Calculate styles based on answer state
                                        let bgStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300";
                                        
                                        if (isAnswered) {
                                            if (idx === questions[currentQuestion].correct) {
                                                bgStyle = "bg-green-500/20 border-green-500 text-green-400 ring-2 ring-green-500/50"; // Correct answer styling
                                            } else if (idx === selectedOption) {
                                                bgStyle = "bg-red-500/20 border-red-500 text-red-400"; // Wrong selection styling
                                            }
                                        } else if (selectedOption === idx) {
                                            bgStyle = "bg-primary/20 border-primary text-white"; // Hover/Active styling (though disabled here as answer is immediate)
                                        }

                                        return (
                                            <motion.button
                                                key={idx}
                                                whileHover={!isAnswered ? { scale: 1.02, x: 10 } : {}}
                                                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                                onClick={() => handleAnswer(idx)}
                                                disabled={isAnswered}
                                                className={`w-full text-left p-6 font-medium text-lg rounded-2xl border-2 transition-all duration-300 flex items-center justify-between ${bgStyle} ${!isAnswered ? 'cursor-pointer hover:border-primary/50 hover:text-white' : 'cursor-default'}`}
                                            >
                                                <span>{opt}</span>
                                                {isAnswered && idx === questions[currentQuestion].correct && (
                                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                <AnimatePresence>
                                    {isAnswered && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0, mt: 0 }}
                                            animate={{ opacity: 1, height: 'auto', mt: 32 }}
                                            className="flex justify-end"
                                        >
                                            <Button onClick={handleNext} variant="primary" className="px-10 py-4 font-bold rounded-xl space-x-2">
                                                <span>{currentQuestion < questions.length - 1 ? t('quiz.next') : t('quiz.finish')}</span>
                                                <ChevronRight size={20} />
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                    {/* RESULT SCREEN */}
                    {currentStep === 'result' && (
                        <motion.div 
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/5 border border-primary/30 backdrop-blur-2xl p-10 md:p-16 rounded-[40px] max-w-3xl mx-auto text-center shadow-[0_0_50px_rgba(227,10,23,0.1)] relative"
                        >
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark p-2 rounded-full">
                                <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                                    <Award className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            
                            <h2 className="text-3xl font-black text-gray-300 mb-2 mt-8 uppercase tracking-widest text-sm">
                                {t('quiz.your_score')}
                            </h2>
                            
                            <div className="text-7xl font-black text-white mb-8 drop-shadow-[0_5px_15px_rgba(227,10,23,0.5)]">
                                {score} <span className="text-3xl text-gray-500">/ {questions.length}</span>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-6 mb-10 border border-white/5">
                                <h3 className="text-2xl font-bold text-accent mb-3">{getLevel().title}</h3>
                                <p className="text-gray-300 text-lg leading-relaxed">{getLevel().desc}</p>
                            </div>

                            <div className="border-t border-white/10 pt-10">
                                <p className="text-gray-400 mb-6">{t('quiz.recommendation')}</p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Button onClick={handleStart} variant="outline" className="border-white/20 text-white hover:bg-white/10 py-4">
                                        {i18n.language === 'tr' ? "Tekrar Çöz" : "Qayta Yechish"}
                                    </Button>
                                    
                                    <button 
                                        onClick={() => {
                                            navigate('/');
                                            setTimeout(() => {
                                                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }}
                                        className="bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
                                    >
                                        {t('quiz.check_prices')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
};

export default Quiz;
