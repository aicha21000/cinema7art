const movieQuotes = [
    {
        id: 1,
        quote: "أنا سأقدم له عرضاً لا يمكن رفضه",
        movie: "The Godfather",
        character: "Don Vito Corleone",
        year: 1972
    },
    {
        id: 2,
        quote: "أنا ملك العالم!",
        movie: "Titanic",
        character: "Jack Dawson",
        year: 1997
    },
    {
        id: 3,
        quote: "قد تكون القوة معك",
        movie: "Star Wars",
        character: "Obi-Wan Kenobi",
        year: 1977
    },
    {
        id: 4,
        quote: "الحياة مثل علبة الشوكولاتة",
        movie: "Forrest Gump",
        character: "Forrest Gump",
        year: 1994
    },
    {
        id: 5,
        quote: "سأعود",
        movie: "The Terminator",
        character: "The Terminator",
        year: 1984
    },
    {
        id: 6,
        quote: "هنا جوني!",
        movie: "The Shining",
        character: "Jack Torrance",
        year: 1980
    },
    {
        id: 7,
        quote: "أحب رائحة النابالم في الصباح",
        movie: "Apocalypse Now",
        character: "Lt. Col. Kilgore",
        year: 1979
    },
    {
        id: 8,
        quote: "أريد الحقيقة!",
        movie: "A Few Good Men",
        character: "Col. Jessup",
        year: 1992
    },
    {
        id: 9,
        quote: "اتبع الأرنب الأبيض",
        movie: "The Matrix",
        character: "Trinity",
        year: 1999
    },
    {
        id: 10,
        quote: "أنت ستحتاج قارباً أكبر",
        movie: "Jaws",
        character: "Chief Brody",
        year: 1975
    },
    {
        id: 11,
        quote: "أنا الآن جاهز للقرب",
        movie: "Taxi Driver",
        character: "Travis Bickle",
        year: 1976
    },
    {
        id: 12,
        quote: "إلى ما لا نهاية وما بعدها",
        movie: "Toy Story",
        character: "Buzz Lightyear",
        year: 1995
    },
    {
        id: 13,
        quote: "أنا طيد العالم السفلي",
        movie: "Scarface",
        character: "Tony Montana",
        year: 1983
    },
    {
        id: 14,
        quote: "حياة جميلة",
        movie: "It's a Wonderful Life",
        character: "George Bailey",
        year: 1946
    },
    {
        id: 15,
        quote: "أنا أحلم بعالم أفضل",
        movie: "Gladiator",
        character: "Maximus",
        year: 2000
    },
    {
        id: 16,
        quote: "أشعر بالحاجة... الحاجة للسرعة!",
        movie: "Top Gun",
        character: "Maverick",
        year: 1986
    },
    {
        id: 17,
        quote: "يو، أدريان!",
        movie: "Rocky",
        character: "Rocky Balboa",
        year: 1976
    },
    {
        id: 18,
        quote: "أنا أأجعلك عرضاً لا يمكنك رفضه",
        movie: "The Godfather",
        character: "Michael Corleone",
        year: 1972
    },
    {
        id: 19,
        quote: "الجشع... جيد",
        movie: "Wall Street",
        character: "Gordon Gekko",
        year: 1987
    },
    {
        id: 20,
        quote: "أنا روح الانتقام",
        movie: "Batman",
        character: "Batman",
        year: 1989
    },
    {
        id: 21,
        quote: "حياتي كلها كانت مجرد تحضير لهذه اللحظة",
        movie: "The Karate Kid",
        character: "Daniel LaRusso",
        year: 1984
    },
    {
        id: 22,
        quote: "كل شيء جميل في الحب والحرب",
        movie: "Gone with the Wind",
        character: "Rhett Butler",
        year: 1939
    },
    {
        id: 23,
        quote: "أنا سأصبح أسطورة",
        movie: "I Am Legend",
        character: "Robert Neville",
        year: 2007
    },
    {
        id: 24,
        quote: "لا تفكر... اشعر",
        movie: "Enter the Dragon",
        character: "Bruce Lee",
        year: 1973
    },
    {
        id: 25,
        quote: "هذه ليست المدينة التي نستحقها، بل المدينة التي نحتاجها",
        movie: "The Dark Knight",
        character: "Batman",
        year: 2008
    },
    {
        id: 26,
        quote: "اترك المسدس، خذ الكانولي",
        movie: "The Godfather",
        character: "Peter Clemenza",
        year: 1972
    },
    {
        id: 27,
        quote: "أنا أحب رائحة الكافيين في الصباح",
        movie: "Pulp Fiction",
        character: "Vincent Vega",
        year: 1994
    },
    {
        id: 28,
        quote: "أنا أؤمن بالعدالة",
        movie: "Superman",
        character: "Superman",
        year: 1978
    },
    {
        id: 29,
        quote: "الحب يعني ألا تضطر أبداً للقول آسف",
        movie: "Love Story",
        character: "Jennifer Cavalleri",
        year: 1970
    },
    {
        id: 30,
        quote: "أنا أحب عندما تتحقق خطة",
        movie: "The A-Team",
        character: "Hannibal Smith",
        year: 2010
    },
    {
        id: 31,
        quote: "حتى أصغر شخص يمكنه تغيير مجرى المستقبل",
        movie: "Back to the Future",
        character: "Doc Brown",
        year: 1985
    },
    {
        id: 32,
        quote: "الخوف هو قاتل العقل",
        movie: "Dune",
        character: "Paul Atreides",
        year: 1984
    },
    {
        id: 33,
        quote: "أنا لست محامياً... أنا مجرد رجل يعرف القانون",
        movie: "The Firm",
        character: "Mitch McDeere",
        year: 1993
    },
    {
        id: 34,
        quote: "في الفضاء، لا أحد يمكنه سماع صراخك",
        movie: "Alien",
        character: "Tagline",
        year: 1979
    },
    {
        id: 35,
        quote: "لقد رأيت الجنة والجحيم",
        movie: "Platoon",
        character: "Chris Taylor",
        year: 1986
    },
    {
        id: 36,
        quote: "لا يوجد محاولة. إما أن تفعل أو لا تفعل",
        movie: "Star Wars: The Empire Strikes Back",
        character: "Yoda",
        year: 1980
    },
    {
        id: 37,
        quote: "أنت لا تستطيع التعامل مع الحقيقة!",
        movie: "A Few Good Men",
        character: "Col. Nathan Jessup",
        year: 1992
    },
    {
        id: 38,
        quote: "أنا سيد مصيري، أنا كابتن روحي",
        movie: "Dead Poets Society",
        character: "John Keating",
        year: 1989
    },
    {
        id: 39,
        quote: "الحياة تجد دائماً طريقها",
        movie: "Jurassic Park",
        character: "Dr. Ian Malcolm",
        year: 1993
    },
    {
        id: 40,
        quote: "أرى أشخاصاً موتى",
        movie: "The Sixth Sense",
        character: "Cole Sear",
        year: 1999
    },
    {
        id: 41,
        quote: "هذا هو الشيء الجميل في الذكريات، أنها تبقى معك",
        movie: "Field of Dreams",
        character: "Ray Kinsella",
        year: 1989
    },
    {
        id: 42,
        quote: "لا شيء مستحيل",
        movie: "Million Dollar Baby",
        character: "Frankie Dunn",
        year: 2004
    },
    {
        id: 43,
        quote: "كل يوم هو فرصة جديدة",
        movie: "The Shawshank Redemption",
        character: "Andy Dufresne",
        year: 1994
    },
    {
        id: 44,
        quote: "الخير موجود في هذا العالم",
        movie: "The Lord of the Rings",
        character: "Gandalf",
        year: 2001
    },
    {
        id: 45,
        quote: "أنا المنتقم",
        movie: "Batman Begins",
        character: "Batman",
        year: 2005
    }
];

const dailyTrivia = [
    {
        id: 1,
        questions: [
            {
                question: "من هو المخرج الحائز على أكبر عدد من جوائز الأوسكار؟",
                options: ["Steven Spielberg", "Martin Scorsese", "John Ford", "Francis Ford Coppola"],
                correct: 2,
                fact: "فاز John Ford بأربع جوائز أوسكار كأفضل مخرج"
            },
            {
                question: "ما هو أعلى فيلم تحقيقاً للإيرادات في التاريخ؟",
                options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: Episode VII"],
                correct: 0,
                fact: "حقق Avatar أكثر من 2.8 مليار دولار"
            },
            {
                question: "من هو أكثر ممثل ترشيحاً لجوائز الأوسكار؟",
                options: ["Jack Nicholson", "Al Pacino", "Daniel Day-Lewis", "Robert De Niro"],
                correct: 0,
                fact: "حصل Jack Nicholson على 12 ترشيحاً للأوسكار"
            }
        ],
        date: "2024-01-20"
    },
    {
        id: 2,
        questions: [
            {
                question: "ما هو أول فيلم رسوم متحركة يترشح لجائزة أفضل فيلم في الأوسكار؟",
                options: ["Beauty and the Beast", "Up", "Toy Story", "Snow White"],
                correct: 0,
                fact: "ترشح Beauty and the Beast في عام 1991"
            },
            {
                question: "من هي أول ممثلة سوداء تفوز بجائزة الأوسكار؟",
                options: ["Whoopi Goldberg", "Halle Berry", "Hattie McDaniel", "Octavia Spencer"],
                correct: 2,
                fact: "فازت Hattie McDaniel عام 1939 عن Gone with the Wind"
            },
            {
                question: "أي فيلم فاز بأكبر عدد من جوائز الأوسكار؟",
                options: ["Titanic", "Ben-Hur", "The Lord of the Rings", "La La Land"],
                correct: 0,
                fact: "فاز كل من Titanic و Ben-Hur و The Lord of the Rings: The Return of the King بـ 11 جائزة"
            }
        ],
        date: "2024-01-21"
    },
    {
        id: 3,
        questions: [
            {
                question: "من أخرج فيلم Inception؟",
                options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Martin Scorsese"],
                correct: 0,
                fact: "حقق الفيلم نجاحاً كبيراً وفاز بأربع جوائز أوسكار"
            },
            {
                question: "في أي سنة تم إصدار أول فيلم Star Wars؟",
                options: ["1975", "1976", "1977", "1978"],
                correct: 2,
                fact: "غير Star Wars: A New Hope وجه صناعة السينما إلى الأبد"
            },
            {
                question: "من هو مؤلف موسيقى فيلم Jaws؟",
                options: ["John Williams", "Hans Zimmer", "Ennio Morricone", "Howard Shore"],
                correct: 0,
                fact: "تعتبر موسيقى Jaws من أشهر الموسيقى التصويرية في تاريخ السينما"
            }
        ],
        date: "2024-01-22"
    },
    {
        id: 4,
        questions: [
            {
                question: "ما هو أول فيلم ملون يفوز بجائزة الأوسكار لأفضل فيلم؟",
                options: ["Gone with the Wind", "The Wizard of Oz", "Snow White", "Singin' in the Rain"],
                correct: 0,
                fact: "فاز Gone with the Wind بثماني جوائز أوسكار في عام 1939"
            },
            {
                question: "من هو أصغر فائز بجائزة الأوسكار؟",
                options: ["Shirley Temple", "Tatum O'Neal", "Anna Paquin", "Haley Joel Osment"],
                correct: 1,
                fact: "فازت Tatum O'Neal وعمرها 10 سنوات عن دورها في Paper Moon"
            },
            {
                question: "أي استوديو أنتج أكبر عدد من الأفلام الفائزة بالأوسكار؟",
                options: ["MGM", "Paramount", "Warner Bros", "Universal"],
                correct: 0,
                fact: "كان MGM الاستوديو الأكثر نجاحاً في العصر الذهبي لهوليوود"
            }
        ],
        date: "2024-01-23"
    },
    {
        id: 5,
        questions: [
            {
                question: "ما هو أول فيلم من سلسلة Marvel Cinematic Universe؟",
                options: ["Iron Man", "The Incredible Hulk", "Thor", "Captain America"],
                correct: 0,
                fact: "أطلق Iron Man عام 2008 بداية عصر جديد للأفلام الخارقة"
            },
            {
                question: "من هو المخرج الذي فاز بأول جائزة أوسكار عن فيلم أجنبي؟",
                options: ["Federico Fellini", "Akira Kurosawa", "Ingmar Bergman", "François Truffaut"],
                correct: 0,
                fact: "فاز Fellini بأول جائزة أوسكار لأفضل فيلم أجنبي عن La Strada"
            },
            {
                question: "ما هو أول فيلم ناطق في التاريخ؟",
                options: ["The Jazz Singer", "The Broadway Melody", "Wings", "Sunrise"],
                correct: 0,
                fact: "غير The Jazz Singer (1927) وجه صناعة السينما للأبد"
            }
        ],
        date: "2024-01-24"
    },
    {
        id: 6,
        questions: [
            {
                question: "من هو مبتكر تقنية الرسوم المتحركة Stop Motion؟",
                options: ["Willis O'Brien", "Ray Harryhausen", "George Méliès", "Walt Disney"],
                correct: 2,
                fact: "ابتكر Méliès العديد من التقنيات السينمائية في بداية القرن العشرين"
            },
            {
                question: "ما هو أول فيلم يتجاوز 100 مليون دولار في شباك التذاكر؟",
                options: ["Jaws", "Star Wars", "The Godfather", "The Sound of Music"],
                correct: 0,
                fact: "حقق Jaws هذا الإنجاز في عام 1975 وأسس مفهوم فيلم الصيف الضخم"
            },
            {
                question: "من هو أول ممثل يفوز بجائزة الأوسكار مرتين متتاليتين؟",
                options: ["Spencer Tracy", "Tom Hanks", "Daniel Day-Lewis", "Gary Cooper"],
                correct: 0,
                fact: "فاز Tracy بالجائزة عامي 1937 و1938"
            }
        ],
        date: "2024-01-25"
    },
    {
        id: 7,
        questions: [
            {
                question: "ما هو أطول فيلم حائز على جائزة الأوسكار؟",
                options: ["Gone with the Wind", "Lawrence of Arabia", "Ben-Hur", "The Lord of the Rings"],
                correct: 1,
                fact: "مدة فيلم Lawrence of Arabia 216 دقيقة"
            },
            {
                question: "من هو المخرج الحائز على أكبر عدد من الترشيحات للأوسكار؟",
                options: ["William Wyler", "Martin Scorsese", "Steven Spielberg", "Alfred Hitchcock"],
                correct: 0,
                fact: "حصل Wyler على 12 ترشيحاً للأوسكار كأفضل مخرج"
            },
            {
                question: "ما هو أول فيلم يستخدم المؤثرات الصوتية Dolby؟",
                options: ["Star Wars", "Close Encounters", "Superman", "Apocalypse Now"],
                correct: 0,
                fact: "كان Star Wars رائداً في تقنيات الصوت السينمائي"
            }
        ],
        date: "2024-01-26"
    }
];

const gameService = {
    // Pour le défi quotidien
    getDailyTrivia: () => {
        const today = new Date().toISOString().split('T')[0];
        return dailyTrivia.find(trivia => trivia.date === today) || dailyTrivia[0];
    },

    // Pour les citations de films
    getRandomQuotes: (count = 5) => {
        const shuffled = [...movieQuotes]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
            
        return shuffled;
    },

    checkQuote: (quoteId, answer) => {
        const quote = movieQuotes.find(q => q.id === quoteId);
        
        // Normaliser la réponse et la réponse correcte pour la comparaison
        const normalizedAnswer = answer.toLowerCase().trim();
        const normalizedCorrect = quote.movie.toLowerCase().trim();
        
        // Vérifier si la réponse est correcte
        const isCorrect = normalizedAnswer === normalizedCorrect;
        
        return {
            correct: isCorrect,
            answer: quote.movie,
            character: quote.character,
            year: quote.year,
            // Ajouter des informations supplémentaires pour l'affichage
            message: isCorrect ? 'إجابة صحيحة!' : `الإجابة الصحيحة هي: ${quote.movie}`
        };
    },

    getMovieSuggestions: (query) => {
        // Convertir la requête en minuscules pour une recherche insensible à la casse
        const searchQuery = query.toLowerCase().trim();
        
        // Créer un ensemble unique de titres de films à partir des citations
        const allMovies = [...new Set(movieQuotes.map(q => q.movie))];
        
        // Fonction pour calculer la pertinence d'une suggestion
        const getRelevanceScore = (movie) => {
            const movieLower = movie.toLowerCase();
            
            // Score plus élevé pour les correspondances au début du titre
            if (movieLower.startsWith(searchQuery)) return 3;
            
            // Score moyen pour les correspondances de mots complets
            if (movieLower.includes(` ${searchQuery}`)) return 2;
            
            // Score bas pour les correspondances partielles
            if (movieLower.includes(searchQuery)) return 1;
            
            return 0;
        };

        // Filtrer et trier les suggestions par pertinence
        return allMovies
            .map(movie => ({
                title: movie,
                score: getRelevanceScore(movie)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(item => item.title)
            .slice(0, 5);
    },

    // Nouvelle fonction pour obtenir un indice
    getHint: (quoteId) => {
        const quote = movieQuotes.find(q => q.id === quoteId);
        
        return {
            year: quote.year,
            character: quote.character,
            // Donner la première lettre et le nombre de lettres
            titleHint: `${quote.movie.charAt(0)}${'•'.repeat(quote.movie.length - 1)}`,
            // Ajouter le genre ou une autre information utile si disponible
            additionalInfo: `Film sorti en ${quote.year}`
        };
    }
};

export default gameService; 