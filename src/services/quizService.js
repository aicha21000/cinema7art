const movieExpertQuiz = {
    id: "movie-expert",
    title: "اختبار خبير السينما",
    description: "اختبر معرفتك بتاريخ السينما العالمية وأشهر الأفلام والنجوم",
    categories: [
        {
            id: 1,
            title: "كلاسيكيات هوليوود",
            questions: [
                {
                    question: "أي فيلم فاز بجائزة الأوسكار لأفضل فيلم في عام 1942؟",
                    options: ["Citizen Kane", "How Green Was My Valley", "The Maltese Falcon", "Suspicion"],
                    correct: 1,
                    fact: "فاز فيلم How Green Was My Valley على Citizen Kane الذي يعتبر اليوم من أعظم الأفلام"
                },
                {
                    question: "من لعب الدور الرئيسي في فيلم Casablanca (1942)؟",
                    options: ["Clark Gable", "Humphrey Bogart", "James Stewart", "Cary Grant"],
                    correct: 1,  // La bonne réponse (Humphrey Bogart) est maintenant en position 1
                    fact: "جسد Humphrey Bogart شخصية Rick Blaine في هذا الفيلم الكلاسيكي الخالد"
                },
                {
                    question: "من أخرج فيلم Gone with the Wind؟",
                    options: ["Victor Fleming", "George Cukor", "Sam Wood", "William Cameron Menzies"],
                    correct: 0,
                    fact: "أخرج Victor Fleming هذا الفيلم الملحمي الذي فاز بثمانية جوائز أوسكار"
                },
                {
                    question: "من الممثلة التي فازت بجائزة الأوسكار عن دورها في فيلم Roman Holiday؟",
                    options: ["Grace Kelly", "Audrey Hepburn", "Elizabeth Taylor", "Marilyn Monroe"],
                    correct: 1,
                    fact: "فازت Audrey Hepburn بأول جائزة أوسكار لها عن هذا الدور في عام 1954"
                },
                {
                    question: "في أي عام تم إصدار فيلم The Wizard of Oz؟",
                    options: ["1935", "1937", "1939", "1941"],
                    correct: 2,
                    fact: "تم إصدار The Wizard of Oz في عام 1939 وأصبح من أشهر الأفلام الكلاسيكية"
                },
                {
                    question: "من أخرج فيلم It's a Wonderful Life؟",
                    options: ["Frank Capra", "John Ford", "William Wyler", "Cecil B. DeMille"],
                    correct: 0,
                    fact: "أخرج Frank Capra هذا الفيلم الكلاسيكي في عام 1946"
                },
                {
                    question: "من بطل فيلم On the Waterfront؟",
                    options: ["Marlon Brando", "James Dean", "Montgomery Clift", "Paul Newman"],
                    correct: 0,
                    fact: "فاز Marlon Brando بجائزة الأوسكار عن دوره في هذا الفيلم"
                },
                {
                    question: "ما هو أول فيلم ملون يفوز بجائزة الأوسكار لأفضل فيلم؟",
                    options: ["Gone with the Wind", "The Wizard of Oz", "An American in Paris", "Ben-Hur"],
                    correct: 0,
                    fact: "فاز Gone with the Wind بهذا الشرف في عام 1939"
                },
                {
                    question: "من أخرج فيلم Sunset Boulevard؟",
                    options: ["Billy Wilder", "Otto Preminger", "Elia Kazan", "George Stevens"],
                    correct: 0,
                    fact: "أخرج Billy Wilder هذا الفيلم الكلاسيكي في عام 1950"
                },
                {
                    question: "من الممثلة الرئيسية في فيلم All About Eve؟",
                    options: ["Bette Davis", "Joan Crawford", "Rita Hayworth", "Katharine Hepburn"],
                    correct: 0,
                    fact: "قدمت Bette Davis واحداً من أشهر أدوارها في هذا الفيلم"
                },
                {
                    question: "في أي عام تم إصدار فيلم Singin' in the Rain؟",
                    options: ["1950", "1951", "1952", "1953"],
                    correct: 2,
                    fact: "تم إصدار هذا الفيلم الموسيقي الكلاسيكي في عام 1952"
                },
                {
                    question: "من بطل فيلم The Bridge on the River Kwai؟",
                    options: ["Alec Guinness", "William Holden", "Jack Hawkins", "Peter O'Toole"],
                    correct: 0,
                    fact: "فاز Alec Guinness بجائزة الأوسكار عن دوره في هذا الفيلم"
                },
                {
                    question: "من أخرج فيلم Double Indemnity؟",
                    options: ["Billy Wilder", "Alfred Hitchcock", "Howard Hawks", "John Huston"],
                    correct: 0,
                    fact: "أخرج Billy Wilder هذا الفيلم النوار الكلاسيكي في عام 1944"
                },
                {
                    question: "من الممثل الرئيسي في فيلم The Maltese Falcon؟",
                    options: ["Humphrey Bogart", "James Cagney", "Edward G. Robinson", "George Raft"],
                    correct: 0,
                    fact: "قدم Humphrey Bogart دور Sam Spade في هذا الفيلم الكلاسيكي"
                },
                {
                    question: "في أي عام تم إصدار فيلم Some Like It Hot؟",
                    options: ["1957", "1958", "1959", "1960"],
                    correct: 2,
                    fact: "أخرج Billy Wilder هذه الكوميديا الكلاسيكية في عام 1959"
                },
                {
                    question: "من بطلة فيلم Breakfast at Tiffany's؟",
                    options: ["Audrey Hepburn", "Grace Kelly", "Marilyn Monroe", "Elizabeth Taylor"],
                    correct: 0,
                    fact: "قدمت Audrey Hepburn دور Holly Golightly الشهير"
                },
                {
                    question: "من أخرج فيلم The Third Man؟",
                    options: ["Carol Reed", "Orson Welles", "Fritz Lang", "Michael Powell"],
                    correct: 0,
                    fact: "أخرج Carol Reed هذا الفيلم النوار الكلاسيكي في عام 1949"
                },
                {
                    question: "من الممثل الرئيسي في فيلم High Noon؟",
                    options: ["Gary Cooper", "John Wayne", "James Stewart", "Henry Fonda"],
                    correct: 0,
                    fact: "فاز Gary Cooper بجائزة الأوسكار عن دوره في هذا الفيلم"
                },
                {
                    question: "في أي عام تم إصدار فيلم Ben-Hur؟",
                    options: ["1957", "1958", "1959", "1960"],
                    correct: 2,
                    fact: "فاز Ben-Hur بـ 11 جائزة أوسكار في عام 1959"
                },
                {
                    question: "من بطلة فيلم Gilda؟",
                    options: ["Rita Hayworth", "Ava Gardner", "Lauren Bacall", "Gene Tierney"],
                    correct: 0,
                    fact: "قدمت Rita Hayworth واحداً من أشهر أدوارها في هذا الفيلم الكلاسيكي"
                }
            ]
        },
        {
            id: 2,
            title: "العصر الذهبي لأفلام الخيال العلمي",
            questions: [
                {
                    question: "في أي سنة تم إصدار أول فيلم Star Wars؟",
                    options: ["1975", "1976", "1977", "1978"],
                    correct: 2,
                    fact: "تم إصدار Star Wars: A New Hope في 25 مايو 1977"
                },
                {
                    question: "من أخرج فيلم E.T. the Extra-Terrestrial؟",
                    options: ["George Lucas", "James Cameron", "Steven Spielberg", "Robert Zemeckis"],
                    correct: 2,  // La bonne réponse (Steven Spielberg) est maintenant en position 2
                    fact: "أخرج Steven Spielberg هذا الفيلم المحبوب في عام 1982"
                },
                {
                    question: "من أخرج فيلم 2001: A Space Odyssey؟",
                    options: ["Stanley Kubrick", "Arthur C. Clarke", "Ridley Scott", "George Lucas"],
                    correct: 0,
                    fact: "أخرج Stanley Kubrick هذا الفيلم الثوري في عام 1968"
                },
                {
                    question: "أي ممثل لعب دور Ripley في سلسلة أفلام Alien؟",
                    options: ["Sigourney Weaver", "Linda Hamilton", "Jamie Lee Curtis", "Carrie Fisher"],
                    correct: 0,
                    fact: "جسدت Sigourney Weaver شخصية Ellen Ripley في أربعة أفلام من السلسلة"
                },
                {
                    question: "من أخرج فيلم The Matrix؟",
                    options: ["James Cameron", "Christopher Nolan", "The Wachowskis", "Ridley Scott"],
                    correct: 2,
                    fact: "غير The Matrix مفهوم أفلام الأكشن والخيال العلمي"
                },
                {
                    question: "في أي سنة تم إصدار فيلم Blade Runner؟",
                    options: ["1980", "1981", "1982", "1983"],
                    correct: 2,
                    fact: "أخرج Ridley Scott هذا الفيلم الكلاسيكي في عام 1982"
                },
                {
                    question: "من بطل فيلم The Terminator؟",
                    options: ["Arnold Schwarzenegger", "Sylvester Stallone", "Bruce Willis", "Jean-Claude Van Damme"],
                    correct: 0,
                    fact: "جسد Arnold Schwarzenegger دور T-800 في هذا الفيلم الشهير"
                },
                {
                    question: "أي فيلم خيال علمي فاز بجائزة الأوسكار لأفضل فيلم؟",
                    options: ["The Shape of Water", "Avatar", "Inception", "E.T."],
                    correct: 0,
                    fact: "فاز The Shape of Water بجائزة أفضل فيلم في عام 2018"
                },
                {
                    question: "من أخرج فيلم Close Encounters of the Third Kind؟",
                    options: ["Steven Spielberg", "George Lucas", "Robert Zemeckis", "Ridley Scott"],
                    correct: 0,
                    fact: "أخرج Steven Spielberg هذا الفيلم في عام 1977"
                },
                {
                    question: "في أي سنة تم إصدار فيلم Back to the Future؟",
                    options: ["1984", "1985", "1986", "1987"],
                    correct: 1,
                    fact: "أخرج Robert Zemeckis هذا الفيلم الكلاسيكي في عام 1985"
                },
                {
                    question: "من أخرج فيلم Alien؟",
                    options: ["Ridley Scott", "James Cameron", "David Fincher", "Jean-Pierre Jeunet"],
                    correct: 0,
                    fact: "أخرج Ridley Scott الجزء الأول من السلسلة في عام 1979"
                },
                {
                    question: "من بطل فيلم RoboCop (1987)؟",
                    options: ["Peter Weller", "Arnold Schwarzenegger", "Sylvester Stallone", "Kurt Russell"],
                    correct: 0,
                    fact: "جسد Peter Weller دور Alex Murphy/RoboCop"
                },
                {
                    question: "في أي سنة تم إصدار فيلم The Day the Earth Stood Still الأصلي؟",
                    options: ["1951", "1952", "1953", "1954"],
                    correct: 0,
                    fact: "يعتبر هذا الفيلم من كلاسيكيات الخيال العلمي في الخمسينيات"
                },
                {
                    question: "من أخرج فيلم Jurassic Park؟",
                    options: ["Steven Spielberg", "James Cameron", "Robert Zemeckis", "George Lucas"],
                    correct: 0,
                    fact: "أخرج Steven Spielberg هذا الفيلم في عام 1993"
                },
                {
                    question: "أي ممثل لعب دور Neo في The Matrix؟",
                    options: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Will Smith"],
                    correct: 0,
                    fact: "جسد Keanu Reeves دور Neo في ثلاثية The Matrix"
                },
                {
                    question: "في أي سنة تم إصدار فيلم Metropolis؟",
                    options: ["1927", "1928", "1929", "1930"],
                    correct: 0,
                    fact: "يعتبر Metropolis من أوائل أفلام الخيال العلمي في تاريخ السينما"
                },
                {
                    question: "من أخرج فيلم The Fifth Element؟",
                    options: ["Luc Besson", "Jean-Pierre Jeunet", "Paul Verhoeven", "Terry Gilliam"],
                    correct: 0,
                    fact: "أخرج Luc Besson هذا الفيلم في عام 1997"
                },
                {
                    question: "من بطلة فيلم Ghost in the Shell (1995)؟",
                    options: ["Major Motoko Kusanagi", "Tetsuo", "Akira", "Lucy"],
                    correct: 0,
                    fact: "يعتبر هذا الفيلم من كلاسيكيات الأنيمي الياباني"
                },
                {
                    question: "في أي سنة تم إصدار فيلم Tron؟",
                    options: ["1980", "1981", "1982", "1983"],
                    correct: 2,
                    fact: "كان Tron رائداً في استخدام الرسوم المتحركة بالكمبيوتر"
                },
                {
                    question: "من أخرج فيلم Inception؟",
                    options: ["Christopher Nolan", "Ridley Scott", "James Cameron", "Steven Spielberg"],
                    correct: 0,
                    fact: "أخرج Christopher Nolan هذا الفيلم المعقد في عام 2010"
                }
            ]
        },
        {
            id: 3,
            title: "المخرجون الأمريكيون العظماء",
            questions: [
                {
                    question: "أي مخرج اشتهر بأفلام Vertigo و Psycho؟",
                    options: ["Alfred Hitchcock", "Billy Wilder", "John Ford", "Howard Hawks"],
                    correct: 0,
                    fact: "عُرف Alfred Hitchcock بلقب 'سيد التشويق'"
                },
                {
                    question: "من أخرج فيلم The Godfather؟",
                    options: ["Al Pacino", "James Caan", "Robert De Niro", "Marlon Brando"],
                    correct: 3,
                    fact: "فاز Marlon Brando بجائزة الأوسكار عن هذا الدور"
                },
                {
                    question: "أي مخرج معروف بأفلام Taxi Driver و Raging Bull؟",
                    options: ["Martin Scorsese", "Francis Ford Coppola", "Brian De Palma", "William Friedkin"],
                    correct: 0,
                    fact: "يعتبر Martin Scorsese من أهم المخرجين في تاريخ السينما الأمريكية"
                },
                {
                    question: "من أخرج فيلم Jaws؟",
                    options: ["Steven Spielberg", "George Lucas", "Robert Zemeckis", "Richard Donner"],
                    correct: 0,
                    fact: "كان Jaws أول فيلم لـ Spielberg يحقق نجاحاً تجارياً كبيراً"
                },
                {
                    question: "أي مخرج معروف بأفلام الويسترن مثل The Searchers؟",
                    options: ["John Ford", "Howard Hawks", "Sam Peckinpah", "Sergio Leone"],
                    correct: 0,
                    fact: "فاز John Ford بأربع جوائز أوسكار لأفضل مخرج"
                },
                {
                    question: "من أخرج فيلم Apocalypse Now؟",
                    options: ["Francis Ford Coppola", "Stanley Kubrick", "Oliver Stone", "Michael Cimino"],
                    correct: 0,
                    fact: "استغرق تصوير Apocalypse Now أكثر من عامين"
                },
                {
                    question: "أي مخرج معروف بفيلم 2001: A Space Odyssey؟",
                    options: ["Stanley Kubrick", "George Lucas", "Ridley Scott", "Steven Spielberg"],
                    correct: 0,
                    fact: "يعتبر Kubrick من أكثر المخرجين تأثيراً في تاريخ السينما"
                },
                {
                    question: "من أخرج فيلم Schindler's List؟",
                    options: ["Steven Spielberg", "Roman Polanski", "Martin Scorsese", "Robert Zemeckis"],
                    correct: 0,
                    fact: "فاز Schindler's List بسبع جوائز أوسكار"
                },
                {
                    question: "أي مخرج معروف بفيلم Pulp Fiction؟",
                    options: ["Quentin Tarantino", "Robert Rodriguez", "David Lynch", "Joel Coen"],
                    correct: 0,
                    fact: "فاز Tarantino بجائزة الأوسكار لأفضل سيناريو أصلي عن Pulp Fiction"
                },
                {
                    question: "من أخرج فيلم One Flew Over the Cuckoo's Nest؟",
                    options: ["Milos Forman", "Sidney Lumet", "Alan Parker", "Mike Nichols"],
                    correct: 0,
                    fact: "فاز الفيلم بجوائز الأوسكار الخمس الرئيسية"
                },
                {
                    question: "أي مخرج معروف بفيلم Citizen Kane؟",
                    options: ["Orson Welles", "John Huston", "William Wyler", "Frank Capra"],
                    correct: 0,
                    fact: "يعتبر Citizen Kane من أعظم الأفلام في تاريخ السينما"
                },
                {
                    question: "من أخرج فيلم The Shawshank Redemption؟",
                    options: ["Frank Darabont", "Rob Reiner", "Brian De Palma", "Barry Levinson"],
                    correct: 0,
                    fact: "يعتبر The Shawshank Redemption من أعلى الأفلام تقييماً على IMDb"
                },
                {
                    question: "أي مخرج معروف بفيلم Goodfellas؟",
                    options: ["Martin Scorsese", "Brian De Palma", "Francis Ford Coppola", "Michael Mann"],
                    correct: 0,
                    fact: "يعتبر Goodfellas من أهم أفلام العصابات في تاريخ السينما"
                },
                {
                    question: "من أخرج فيلم The Dark Knight؟",
                    options: ["Christopher Nolan", "Zack Snyder", "Tim Burton", "Sam Raimi"],
                    correct: 0,
                    fact: "يعتبر The Dark Knight من أنجح أفلام الأبطال الخارقين"
                },
                {
                    question: "أي مخرج معروف بفيلم Chinatown؟",
                    options: ["Roman Polanski", "Francis Ford Coppola", "William Friedkin", "Peter Bogdanovich"],
                    correct: 0,
                    fact: "يعتبر Chinatown من كلاسيكيات السينما الأمريكية"
                },
                {
                    question: "من أخرج فيلم The Silence of the Lambs؟",
                    options: ["Jonathan Demme", "David Fincher", "Ridley Scott", "Michael Mann"],
                    correct: 0,
                    fact: "فاز الفيلم بجوائز الأوسكار الخمس الرئيسية"
                },
                {
                    question: "أي مخرج معروف بفيلم The Graduate؟",
                    options: ["Mike Nichols", "Arthur Penn", "Alan J. Pakula", "Sydney Pollack"],
                    correct: 0,
                    fact: "فاز Mike Nichols بجائزة الأوسكار لأفضل مخرج عن The Graduate"
                },
                {
                    question: "من أخرج فيلم Raging Bull؟",
                    options: ["Martin Scorsese", "Sidney Lumet", "John Cassavetes", "Elia Kazan"],
                    correct: 0,
                    fact: "يعتبر Raging Bull من أعظم أفلام السيرة الذاتية"
                },
                {
                    question: "أي مخرج معروف بفيلم The Deer Hunter؟",
                    options: ["Michael Cimino", "Francis Ford Coppola", "Oliver Stone", "William Friedkin"],
                    correct: 0,
                    fact: "فاز The Deer Hunter بجائزة الأوسكار لأفضل فيلم عام 1979"
                },
                {
                    question: "من أخرج فيلم Blade Runner؟",
                    options: ["Ridley Scott", "James Cameron", "Paul Verhoeven", "Terry Gilliam"],
                    correct: 0,
                    fact: "أصبح Blade Runner فيلماً مؤثراً في نوع الخيال العلمي"
                }
            ]
        },
        {
            id: 4,
            title: "عالم مارفل السينمائي",
            questions: [
                {
                    question: "أي فيلم أطلق عالم مارفل السينمائي في 2008؟",
                    options: ["The Incredible Hulk", "Iron Man", "Thor", "Captain America"],
                    correct: 1,
                    fact: "بدأ Robert Downey Jr. عالم مارفل السينمائي بدور Tony Stark"
                },
                {
                    question: "من أخرج فيلم The Avengers (2012)؟",
                    options: ["Joss Whedon", "Jon Favreau", "James Gunn", "The Russo Brothers"],
                    correct: 0,
                    fact: "حقق The Avengers أكثر من 1.5 مليار دولار في شباك التذاكر"
                },
                {
                    question: "من لعب دور Thor في MCU؟",
                    options: ["Chris Hemsworth", "Chris Evans", "Chris Pratt", "Tom Hiddleston"],
                    correct: 0,
                    fact: "ظهر Chris Hemsworth في دور Thor لأول مرة في عام 2011"
                },
                {
                    question: "أي فيلم قدم شخصية Black Panther لأول مرة؟",
                    options: ["Black Panther", "Captain America: Civil War", "Avengers: Age of Ultron", "Iron Man 2"],
                    correct: 1,
                    fact: "ظهر Chadwick Boseman لأول مرة كـ Black Panther في Civil War"
                },
                {
                    question: "من لعب دور Doctor Strange؟",
                    options: ["Benedict Cumberbatch", "Martin Freeman", "Michael Fassbender", "Joaquin Phoenix"],
                    correct: 0,
                    fact: "انضم Benedict Cumberbatch إلى MCU في عام 2016"
                },
                {
                    question: "أي فيلم قدم Thanos كشخصية رئيسية؟",
                    options: ["Avengers: Infinity War", "The Avengers", "Guardians of the Galaxy", "Thor: Ragnarok"],
                    correct: 0,
                    fact: "جسد Josh Brolin شخصية Thanos"
                },
                {
                    question: "من أخرج فيلمي Avengers: Infinity War و Endgame؟",
                    options: ["The Russo Brothers", "Joss Whedon", "Jon Favreau", "James Gunn"],
                    correct: 0,
                    fact: "يعتبر Endgame من أعلى الأفلام تحقيقاً للإيرادات في التاريخ"
                },
                {
                    question: "من لعب دور Spider-Man في MCU؟",
                    options: ["Tom Holland", "Andrew Garfield", "Tobey Maguire", "Jake Gyllenhaal"],
                    correct: 0,
                    fact: "ظهر Tom Holland لأول مرة في Captain America: Civil War"
                },
                {
                    question: "أي ممثلة لعبت دور Black Widow؟",
                    options: ["Scarlett Johansson", "Emily Blunt", "Jessica Alba", "Anne Hathaway"],
                    correct: 0,
                    fact: "ظهرت لأول مرة في Iron Man 2"
                },
                {
                    question: "من لعب دور Captain America؟",
                    options: ["Chris Evans", "Chris Hemsworth", "Chris Pratt", "Sebastian Stan"],
                    correct: 0,
                    fact: "جسد Chris Evans الدور في سبعة أفلام رئيسية"
                },
                {
                    question: "أي فيلم قدم Guardians of the Galaxy؟",
                    options: ["Guardians of the Galaxy", "The Avengers", "Thor: The Dark World", "Captain America: The Winter Soldier"],
                    correct: 0,
                    fact: "أخرج James Gunn هذا الفيلم في 2014"
                },
                {
                    question: "من لعب دور Loki؟",
                    options: ["Tom Hiddleston", "Chris Hemsworth", "Mark Ruffalo", "Jeremy Renner"],
                    correct: 0,
                    fact: "أصبح Loki من أكثر الشخصيات المحبوبة في MCU"
                },
                {
                    question: "أي فيلم قدم شخصية Ant-Man؟",
                    options: ["Ant-Man", "Avengers: Age of Ultron", "Captain America: Civil War", "Iron Man 3"],
                    correct: 0,
                    fact: "لعب Paul Rudd دور Scott Lang/Ant-Man"
                },
                {
                    question: "من لعب دور Captain Marvel؟",
                    options: ["Brie Larson", "Emily Blunt", "Jennifer Lawrence", "Charlize Theron"],
                    correct: 0,
                    fact: "تم إصدار Captain Marvel في 2019"
                },
                {
                    question: "أي فيلم كان آخر فيلم في المرحلة الثالثة من MCU؟",
                    options: ["Spider-Man: Far From Home", "Avengers: Endgame", "Captain Marvel", "Ant-Man and the Wasp"],
                    correct: 0,
                    fact: "أنهى هذا الفيلم المرحلة الثالثة من MCU"
                },
                {
                    question: "من لعب دور Bruce Banner/Hulk بعد Edward Norton؟",
                    options: ["Mark Ruffalo", "Eric Bana", "Edward Norton", "Lou Ferrigno"],
                    correct: 0,
                    fact: "انضم Mark Ruffalo إلى MCU في The Avengers"
                },
                {
                    question: "أي فيلم قدم شخصية Vision؟",
                    options: ["Avengers: Age of Ultron", "The Avengers", "Captain America: Civil War", "Iron Man 3"],
                    correct: 0,
                    fact: "لعب Paul Bettany دور Vision"
                },
                {
                    question: "من لعب دور Star-Lord في Guardians of the Galaxy؟",
                    options: ["Chris Pratt", "Chris Evans", "Chris Hemsworth", "Chris Pine"],
                    correct: 0,
                    fact: "غير هذا الدور مسيرة Chris Pratt المهنية"
                },
                {
                    question: "أي فيلم شهد أول ظهور لـ Nick Fury؟",
                    options: ["Iron Man", "The Incredible Hulk", "Thor", "Captain America: The First Avenger"],
                    correct: 0,
                    fact: "ظهر Samuel L. Jackson في مشهد ما بعد الاعتمادات"
                },
                {
                    question: "من لعب دور Scarlet Witch؟",
                    options: ["Elizabeth Olsen", "Scarlett Johansson", "Karen Gillan", "Zoe Saldana"],
                    correct: 0,
                    fact: "ظهرت لأول مرة في Avengers: Age of Ultron"
                }
            ]
        },
        {
            id: 5,
            title: "الأفلام الحائزة على الأوسكار",
            questions: [
                {
                    question: "أي فيلم حصل على أكبر عدد من الترشيحات للأوسكار؟",
                    options: ["All About Eve", "La La Land", "Titanic", "The Shape of Water"],
                    correct: 0,
                    fact: "حصل All About Eve على 14 ترشيحاً، وهو رقم قياسي تشاركه مع Titanic و La La Land"
                },
                {
                    question: "من المخرج ا��وحيد الذي فاز بالأوسكار عن فيلم رعب؟",
                    options: ["William Friedkin", "Jonathan Demme", "Jordan Peele", "Alfred Hitchcock"],
                    correct: 1,
                    fact: "فاز Jonathan Demme عن The Silence of the Lambs"
                },
                {
                    question: "أي فيلم رسوم متحركة فاز بترشيح لجائزة أفضل فيلم؟",
                    options: ["Beauty and the Beast", "Toy Story", "Up", "WALL-E"],
                    correct: 0,
                    fact: "كان Beauty and the Beast أول فيلم رسوم متحركة يترشح لجائزة أفضل فيلم"
                },
                {
                    question: "أي فيلم فاز بجائزة أفضل فيلم في أول حفل للأوسكار؟",
                    options: ["Wings", "Sunrise", "The Jazz Singer", "The Broadway Melody"],
                    correct: 0,
                    fact: "فاز Wings بأول جائزة أوسكار لأفضل فيلم في عام 1929"
                },
                {
                    question: "من أول مخرج من أصل أفريقي يفوز بجائزة أفضل مخرج؟",
                    options: ["Steve McQueen", "Barry Jenkins", "John Singleton", "Spike Lee"],
                    correct: 1,
                    fact: "فاز Barry Jenkins عن فيلم Moonlight في عام 2017"
                },
                {
                    question: "أي فيلم فاز بجميع جوائز الأوسكار الخمس الكبرى؟",
                    options: ["One Flew Over the Cuckoo's Nest", "The Silence of the Lambs", "It Happened One Night", "جميع ما سبق"],
                    correct: 3,
                    fact: "فازت هذه الأفلام الثلاثة بجوائز أفضل فيلم، مخرج، ممثل، ممثلة، وسيناريو"
                },
                {
                    question: "أي فيلم حقق أعلى إيرادات في تاريخ السينما عند عرضه؟",
                    options: ["Avatar", "Titanic", "Star Wars: The Force Awakens", "Avengers: Endgame"],
                    correct: 3,
                    fact: "حقق Avengers: Endgame أكثر من 2.8 مليار دولار"
                },
                {
                    question: "من أول مخرجة تفوز بجائزة الأوسكار لأفضل مخرجة؟",
                    options: ["Jane Campion", "Sofia Coppola", "Kathryn Bigelow", "Greta Gerwig"],
                    correct: 2,
                    fact: "فازت عن فيلم The Hurt Locker في عام 2010"
                },
                {
                    question: "أي فيلم فاز بأكبر عدد من جوائز الأوسكار؟",
                    options: ["Ben-Hur", "Titanic", "The Lord of the Rings: The Return of the King", "West Side Story"],
                    correct: 1,
                    fact: "فاز كل من Ben-Hur وTitanic وThe Lord of the Rings: The Return of the King بـ 11 جائزة"
                },
                {
                    question: "من أول ممثل آسيوي يفوز بجائزة الأوسكار لأفضل ممثل؟",
                    options: ["Yul Brynner", "Ben Kingsley", "Ken Watanabe", "Jackie Chan"],
                    correct: 0,
                    fact: "فاز Yul Brynner عن The King and I في عام 1956"
                },
                {
                    question: "أي فيلم قدم شخصية Black Panther؟",
                    options: ["Black Panther", "Captain America: Civil War", "Avengers: Age of Ultron", "Iron Man 2"],
                    correct: 1,
                    fact: "ظهر Chadwick Boseman لأول مرة كـ Black Panther في Civil War"
                },
                {
                    question: "من لعب دور Doctor Strange؟",
                    options: ["Benedict Cumberbatch", "Martin Freeman", "Michael Fassbender", "Joaquin Phoenix"],
                    correct: 0,
                    fact: "انضم Benedict Cumberbatch إلى MCU في عام 2016"
                },
                {
                    question: "أي فيلم قدم Thanos كشخصية رئيسية؟",
                    options: ["Avengers: Infinity War", "The Avengers", "Guardians of the Galaxy", "Thor: Ragnarok"],
                    correct: 0,
                    fact: "جسد Josh Brolin شخصية Thanos"
                },
                {
                    question: "من أخرج فيلمي Avengers: Infinity War و Endgame؟",
                    options: ["The Russo Brothers", "Joss Whedon", "Jon Favreau", "James Gunn"],
                    correct: 0,
                    fact: "يعتبر Endgame من أعلى الأفلام تحقيقاً للإيرادات في التاريخ"
                },
                {
                    question: "من لعب دور Spider-Man في MCU؟",
                    options: ["Tom Holland", "Andrew Garfield", "Tobey Maguire", "Jake Gyllenhaal"],
                    correct: 0,
                    fact: "ظهر Tom Holland لأول مرة في Captain America: Civil War"
                },
                {
                    question: "أي ممثلة لعبت دور Black Widow؟",
                    options: ["Scarlett Johansson", "Emily Blunt", "Jessica Alba", "Anne Hathaway"],
                    correct: 0,
                    fact: "ظهرت لأول مرة في Iron Man 2"
                },
                {
                    question: "من لعب دور Captain America؟",
                    options: ["Chris Evans", "Chris Hemsworth", "Chris Pratt", "Sebastian Stan"],
                    correct: 0,
                    fact: "جسد Chris Evans الدور في سبعة أفلام رئيسية"
                },
                {
                    question: "أي فيلم قدم Guardians of the Galaxy؟",
                    options: ["Guardians of the Galaxy", "The Avengers", "Thor: The Dark World", "Captain America: The Winter Soldier"],
                    correct: 0,
                    fact: "أخرج James Gunn هذا الفيلم في 2014"
                },
                {
                    question: "من لعب دور Loki؟",
                    options: ["Tom Hiddleston", "Chris Hemsworth", "Mark Ruffalo", "Jeremy Renner"],
                    correct: 0,
                    fact: "أصبح Loki من أكثر الشخصيات المحبوبة في MCU"
                },
                {
                    question: "أي فيلم قدم شخصية Ant-Man؟",
                    options: ["Ant-Man", "Avengers: Age of Ultron", "Captain America: Civil War", "Iron Man 3"],
                    correct: 0,
                    fact: "لعب Paul Rudd دور Scott Lang/Ant-Man"
                },
                {
                    question: "من لعب دور Captain Marvel؟",
                    options: ["Brie Larson", "Emily Blunt", "Jennifer Lawrence", "Charlize Theron"],
                    correct: 0,
                    fact: "تم إصدار Captain Marvel في 2019"
                },
                {
                    question: "أي فيلم كان آخر فيلم في المرحلة الثالثة من MCU؟",
                    options: ["Spider-Man: Far From Home", "Avengers: Endgame", "Captain Marvel", "Ant-Man and the Wasp"],
                    correct: 0,
                    fact: "أنهى هذا الفيلم المرحلة الثالثة من MCU"
                },
                {
                    question: "من لعب دور Bruce Banner/Hulk بعد Edward Norton؟",
                    options: ["Mark Ruffalo", "Eric Bana", "Edward Norton", "Lou Ferrigno"],
                    correct: 0,
                    fact: "انضم Mark Ruffalo إلى MCU في The Avengers"
                },
                {
                    question: "أي فيلم قدم شخصية Vision؟",
                    options: ["Avengers: Age of Ultron", "The Avengers", "Captain America: Civil War", "Iron Man 3"],
                    correct: 0,
                    fact: "لعب Paul Bettany دور Vision"
                },
                {
                    question: "من لعب دور Star-Lord في Guardians of the Galaxy؟",
                    options: ["Chris Pratt", "Chris Evans", "Chris Hemsworth", "Chris Pine"],
                    correct: 0,
                    fact: "غير هذا الدور مسيرة Chris Pratt المهنية"
                },
                {
                    question: "أي فيلم شهد أول ظهور لـ Nick Fury؟",
                    options: ["Iron Man", "The Incredible Hulk", "Thor", "Captain America: The First Avenger"],
                    correct: 0,
                    fact: "ظهر Samuel L. Jackson في مشهد ما بعد الاعتمادات"
                },
                {
                    question: "من لعب دور Scarlet Witch؟",
                    options: ["Elizabeth Olsen", "Scarlett Johansson", "Karen Gillan", "Zoe Saldana"],
                    correct: 0,
                    fact: "ظهرت لأول مرة في Avengers: Age of Ultron"
                }
            ]
        },
        {
            id: 6,
            title: "أفلام الأكشن والمغامرة",
            questions: [
                {
                    question: "من بطل سلسلة أفلام Die Hard؟",
                    options: ["Bruce Willis", "Mel Gibson", "Arnold Schwarzenegger", "Sylvester Stallone"],
                    correct: 0,
                    fact: "أصبح Bruce Willis نجماً عالمياً بفضل هذا الدور"
                },
                {
                    question: "من أخرج فيلم Top Gun؟",
                    options: ["Tony Scott", "Ridley Scott", "Jerry Bruckheimer", "Don Simpson"],
                    correct: 0,
                    fact: "حقق الفيلم نجاحاً كبيراً في عام 1986"
                },
                {
                    question: "من بطل فيلم The Rock؟",
                    options: ["Sean Connery", "Nicolas Cage", "Ed Harris", "Michael Biehn"],
                    correct: 0,
                    fact: "أخرج Michael Bay هذا الفيلم في عام 1996"
                },
                {
                    question: "من بطل فيلم Speed؟",
                    options: ["Keanu Reeves", "Dennis Hopper", "Sandra Bullock", "Jeff Daniels"],
                    correct: 0,
                    fact: "كان هذا الفيلم نقطة تحول في مسيرة Sandra Bullock"
                },
                {
                    question: "من أخرج فيلم Raiders of the Lost Ark؟",
                    options: ["Steven Spielberg", "George Lucas", "Robert Zemeckis", "Richard Donner"],
                    correct: 0,
                    fact: "أول فيلم في سلسلة Indiana Jones"
                },
                {
                    question: "من بطل فيلم First Blood (Rambo)؟",
                    options: ["Sylvester Stallone", "Arnold Schwarzenegger", "Chuck Norris", "Jean-Claude Van Damme"],
                    correct: 0,
                    fact: "بداية سلسلة أفلام Rambo الشهيرة"
                },
                {
                    question: "من بطل فيلم Point Break؟",
                    options: ["Keanu Reeves", "Patrick Swayze", "Gary Busey", "Lori Petty"],
                    correct: 0,
                    fact: "أخرجت Kathryn Bigelow هذا الفيلم في عام 1991"
                },
                {
                    question: "من أخرج فيلم Predator؟",
                    options: ["John McTiernan", "James Cameron", "Paul Verhoeven", "John Carpenter"],
                    correct: 0,
                    fact: "كان هذا أحد أشهر أفلام Arnold Schwarzenegger"
                },
                {
                    question: "من بطل فيلم Face/Off؟",
                    options: ["John Travolta", "Nicolas Cage", "Joan Allen", "Alessandro Nivola"],
                    correct: 0,
                    fact: "أخرج John Woo هذا الفيلم في عام 1997"
                }
            ]
        },
        {
            id: 7,
            title: "الأفلام الكوميدية",
            questions: [
                {
                    question: "من أخرج فيلم Some Like It Hot؟",
                    options: ["Billy Wilder", "Howard Hawks", "George Cukor", "Frank Capra"],
                    correct: 0,
                    fact: "يعتبر من أعظم الأفلام الكوميدية في تاريخ السينما"
                },
                {
                    question: "من بطل فيلم Groundhog Day؟",
                    options: ["Bill Murray", "Dan Aykroyd", "Chevy Chase", "Steve Martin"],
                    correct: 0,
                    fact: "أصبح الفيلم مصطلحاً يستخدم لوصف تكرار الأحداث"
                },
                {
                    question: "من أخرج فيلم The Big Lebowski؟",
                    options: ["The Coen Brothers", "Quentin Tarantino", "Paul Thomas Anderson", "Wes Anderson"],
                    correct: 0,
                    fact: "أصبح فيلماً عبادياً له متابعون متحمسون"
                },
                {
                    question: "من بطل فيلم Ace Ventura: Pet Detective؟",
                    options: ["Jim Carrey", "Adam Sandler", "Mike Myers", "Will Ferrell"],
                    correct: 0,
                    fact: "كان هذا الفيلم نقطة انطلاق Jim Carrey في هوليوود"
                },
                {
                    question: "من أخرج فيلم Airplane!؟",
                    options: ["Jim Abrahams", "Mel Brooks", "John Landis", "Ivan Reitman"],
                    correct: 0,
                    fact: "يعتبر من أكثر الأفلام الكوميدية تأثيراً في التاريخ"
                },
                {
                    question: "من بطل فيلم Mrs. Doubtfire؟",
                    options: ["Robin Williams", "Steve Martin", "Eddie Murphy", "Bill Murray"],
                    correct: 0,
                    fact: "فاز الفيلم بجائزة الأوسكار لأفضل مكياج"
                },
                {
                    question: "من بطل فيلم The Mask؟",
                    options: ["Jim Carrey", "Eddie Murphy", "Mike Myers", "Adam Sandler"],
                    correct: 0,
                    fact: "كان هذا أحد الأفلام التي أطلقت نجومية Jim Carrey"
                },
                {
                    question: "من أخرج فيلم Ghostbusters (1984)؟",
                    options: ["Ivan Reitman", "John Landis", "Harold Ramis", "John Hughes"],
                    correct: 0,
                    fact: "أصبح الفيلم ظاهرة ثقافية في الثمانينيات"
                },
                {
                    question: "من بطل فيلم Dumb and Dumber؟",
                    options: ["Jim Carrey", "Jeff Daniels", "Ben Stiller", "Owen Wilson"],
                    correct: 0,
                    fact: "من أنجح أفلام الكوميديا في التسعينيات"
                },
                {
                    question: "من بطل فيلم Austin Powers؟",
                    options: ["Mike Myers", "Jim Carrey", "Will Ferrell", "Ben Stiller"],
                    correct: 0,
                    fact: "لعب Mike Myers دور البطولة المزدوج في الفيلم"
                },
                {
                    question: "من أخرج فيلم Bridesmaids؟",
                    options: ["Paul Feig", "Judd Apatow", "Adam McKay", "Todd Phillips"],
                    correct: 0,
                    fact: "حقق الفيلم نجاحاً كبيراً في شباك التذاكر"
                },
                {
                    question: "من بطل فيلم The Hangover؟",
                    options: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis", "Justin Bartha"],
                    correct: 0,
                    fact: "أصبح الفيلم من أنجح أفلام الكوميديا في التاريخ"
                },
                {
                    question: "من بطل فيلم Ferris Bueller's Day Off؟",
                    options: ["Matthew Broderick", "John Hughes", "Alan Ruck", "Mia Sara"],
                    correct: 0,
                    fact: "أخرج John Hughes هذا الفيلم الكوميدي الكلاسيكي"
                },
                {
                    question: "من أخرج فيلم This Is Spinal Tap؟",
                    options: ["Rob Reiner", "Christopher Guest", "Michael McKean", "Harry Shearer"],
                    correct: 0,
                    fact: "يعتبر من أوائل أفلام المحاكاة الساخرة"
                },
                {
                    question: "من بطل فيلم Trading Places؟",
                    options: ["Eddie Murphy", "Dan Aykroyd", "Jamie Lee Curtis", "Ralph Bellamy"],
                    correct: 0,
                    fact: "من أنجح الكوميديات في الثمانينيات"
                },
                {
                    question: "من بطل فيلم Anchorman؟",
                    options: ["Will Ferrell", "Steve Carell", "Paul Rudd", "David Koechner"],
                    correct: 0,
                    fact: "أصبح الفيلم من الكلاسيكيات الكوميدية الحديثة"
                },
                {
                    question: "من أخرج فيلم Shaun of the Dead؟",
                    options: ["Edgar Wright", "Simon Pegg", "Nick Frost", "Peter Jackson"],
                    correct: 0,
                    fact: "مزج الفيلم بين الكوميديا وأفلام الزومبي"
                },
                {
                    question: "من بطل فيلم The Big Sick؟",
                    options: ["Kumail Nanjiani", "Ray Romano", "Zoe Kazan", "Holly Hunter"],
                    correct: 0,
                    fact: "مبني على قصة حقيقية من حياة Kumail Nanjiani"
                },
                {
                    question: "من أخرج فيلم Superbad؟",
                    options: ["Greg Mottola", "Judd Apatow", "Seth Rogen", "Evan Goldberg"],
                    correct: 0,
                    fact: "كتب Seth Rogen وEvan Goldberg السيناريو عندما كانا في المدرسة الثانوية"
                },
                {
                    question: "من بطل فيلم School of Rock؟",
                    options: ["Jack Black", "Mike White", "Joan Cusack", "Sarah Silverman"],
                    correct: 0,
                    fact: "أخرج Richard Linklater هذه الكوميديا الموسيقية"
                }
            ]
        },
        {
            id: 8,
            title: "أفلام الغموض والإثارة",
            questions: [
                {
                    question: "من أخرج فيلم The Silence of the Lambs؟",
                    options: ["Jonathan Demme", "David Fincher", "Ridley Scott", "Michael Mann"],
                    correct: 0,
                    fact: "فاز الفيلم بخمس جوائز أوسكار رئيسية"
                },
                {
                    question: "من بطل فيلم Se7en؟",
                    options: ["Brad Pitt", "Morgan Freeman", "Kevin Spacey", "Gwyneth Paltrow"],
                    correct: 0,
                    fact: "أخرج David Fincher هذا الفيلم المثير في عام 1995"
                },
                {
                    question: "من أخرج فيلم Memento؟",
                    options: ["Christopher Nolan", "David Lynch", "Darren Aronofsky", "M. Night Shyamalan"],
                    correct: 0,
                    fact: "كان هذا الفيلم نقطة تحول في مسيرة Christopher Nolan"
                },
                {
                    question: "من بطل فيلم Fight Club؟",
                    options: ["Edward Norton", "Brad Pitt", "Jared Leto", "Helena Bonham Carter"],
                    correct: 0,
                    fact: "أصبح الفيلم من الأفلام العبادية في السينما"
                },
                {
                    question: "من أخرج فيلم Psycho؟",
                    options: ["William Friedkin", "Alfred Hitchcock", "Howard Hawks", "John Ford"],
                    correct: 1,
                    fact: "عُرف Alfred Hitchcock بلقب 'سيد التشويق'"
                },
                {
                    question: "من بطلة فيلم Basic Instinct؟",
                    options: ["Sharon Stone", "Michelle Pfeiffer", "Kim Basinger", "Glenn Close"],
                    correct: 0,
                    fact: "أخرج Paul Verhoeven هذا الفيلم المثير للجدل"
                },
                {
                    question: "من أخرج فيلم The Usual Suspects؟",
                    options: ["Bryan Singer", "David Fincher", "Christopher Nolan", "Martin Scorsese"],
                    correct: 0,
                    fact: "فاز Kevin Spacey بجائزة الأوسكار عن دوره في الفيلم"
                },
                {
                    question: "من بطل فيلم Shutter Island؟",
                    options: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley", "Max von Sydow"],
                    correct: 0,
                    fact: "أخرج Martin Scorsese هذا الفيلم النفسي"
                },
                {
                    question: "من أخرج فيلم Gone Girl؟",
                    options: ["David Fincher", "Christopher Nolan", "Denis Villeneuve", "Darren Aronofsky"],
                    correct: 0,
                    fact: "مقتبس من رواية Gillian Flynn"
                },
                {
                    question: "من بطل فيلم Zodiac؟",
                    options: ["Jake Gyllenhaal", "Robert Downey Jr.", "Mark Ruffalo", "Brian Cox"],
                    correct: 0,
                    fact: "يستند الفيلم إلى قصة حقيقية"
                },
                {
                    question: "من أخرج فيلم Mulholland Drive؟",
                    options: ["David Lynch", "Roman Polanski", "Darren Aronofsky", "Paul Thomas Anderson"],
                    correct: 0,
                    fact: "يعتبر من أكثر الأفلام غموضاً في تاريخ السينما"
                },
                {
                    question: "من بطلة فيلم Black Swan؟",
                    options: ["Natalie Portman", "Mila Kunis", "Vincent Cassel", "Barbara Hershey"],
        correct: 0,
                    fact: "فازت Natalie Portman بجائزة الأوسكار عن دورها"
    },
    {
        question: "من أخرج فيلم Inception؟",
                    options: ["Christopher Nolan", "Ridley Scott", "James Cameron", "Steven Spielberg"],
                    correct: 0,
                    fact: "يمزج الفيلم بين الغموض والخيال العلمي"
                },
                {
                    question: "من بطل فيلم Prisoners؟",
                    options: ["Hugh Jackman", "Jake Gyllenhaal", "Paul Dano", "Melissa Leo"],
                    correct: 0,
                    fact: "أخرج Denis Villeneuve هذا الفيلم المتوتر"
                },
                {
                    question: "من أخرج فيلم The Sixth Sense؟",
                    options: ["M. Night Shyamalan", "James Wan", "Guillermo del Toro", "Sam Raimi"],
                    correct: 0,
                    fact: "معروف بنهايته المفاجئة الشهيرة"
                },
                {
                    question: "من بطل فيلم American Psycho؟",
                    options: ["Christian Bale", "Willem Dafoe", "Jared Leto", "Reese Witherspoon"],
                    correct: 0,
                    fact: "مقتبس من رواية Bret Easton Ellis"
                },
                {
                    question: "من أخرج فيلم Chinatown؟",
                    options: ["Roman Polanski", "Francis Ford Coppola", "William Friedkin", "Peter Bogdanovich"],
                    correct: 0,
                    fact: "يعتبر من كلاسيكيات السينما الأمريكية"
                },
                {
                    question: "من بطل فيلم Oldboy الأمريكي؟",
                    options: ["Josh Brolin", "Samuel L. Jackson", "Elizabeth Olsen", "Sharlto Copley"],
                    correct: 0,
                    fact: "إعادة إنتاج للفيلم الكوري الجنوبي الشهير"
                },
                {
                    question: "من أخرج فيلم Vertigo؟",
                    options: ["Alfred Hitchcock", "Otto Preminger", "Billy Wilder", "Carol Reed"],
                    correct: 0,
                    fact: "يعتبر من أعظم أفلام Hitchcock"
                },
                {
                    question: "من بطلة فيلم Fatal Attraction؟",
                    options: ["Glenn Close", "Michael Douglas", "Anne Archer", "Ellen Hamilton Latzen"],
                    correct: 0,
                    fact: "حصل الفيلم على ستة ترشيحات للأوسكار"
                }
            ]
        },
        {
            id: 9,
            title: "الأفلام التاريخية",
            questions: [
                {
                    question: "من أخرج فيلم Braveheart؟",
                    options: ["Ridley Scott", "Mel Gibson", "Oliver Stone", "Kenneth Branagh"],
                    correct: 1,
                    fact: "فاز الفيلم بخمس جوائز أوسكار بما فيها أفضل فيلم ومخرج"
                },
                {
                    question: "من بطل فيلم The Godfather؟",
                    options: ["Al Pacino", "James Caan", "Robert De Niro", "Marlon Brando"],
                    correct: 3,
                    fact: "فاز Marlon Brando بجائزة الأوسكار عن هذا الدور"
                },
                {
                    question: "من أخرج فيلم Schindler's List؟",
                    options: ["Steven Spielberg", "Roman Polanski", "Martin Scorsese", "Stanley Kubrick"],
                    correct: 0,
                    fact: "فاز الفيلم بسبع جوائز أوسكار"
                },
                {
                    question: "من بطل فيلم Gladiator؟",
                    options: ["Joaquin Phoenix", "Oliver Reed", "Richard Harris", "Russell Crowe"],
                    correct: 3,
                    fact: "فاز Russell Crowe بجائزة الأوسكار عن دوره"
                },
                {
                    question: "من أخرج فيلم The Last Emperor؟",
                    options: ["Bernardo Bertolucci", "David Lean", "Oliver Stone", "Richard Attenborough"],
                    correct: 0,
                    fact: "فاز الفيلم بتسع جوائز أوسكار"
                },
                {
                    question: "من بطل فيلم Gandhi؟",
                    options: ["Ben Kingsley", "Martin Sheen", "John Gielgud", "Edward Fox"],
                    correct: 0,
                    fact: "فاز Ben Kingsley بجائزة الأوسكار عن تجسيده لشخصية Gandhi"
                },
                {
                    question: "من أخرج فيلم Kingdom of Heaven؟",
                    options: ["Ridley Scott", "Oliver Stone", "Wolfgang Petersen", "Mel Gibson"],
                    correct: 0,
                    fact: "يدور الفيلم حول أحداث الحروب الصليبية"
                },
                {
                    question: "من بطل فيلم The Last of the Mohicans؟",
                    options: ["Daniel Day-Lewis", "Russell Means", "Madeleine Stowe", "Wes Studi"],
                    correct: 0,
                    fact: "أخرج Michael Mann هذا الفيلم التاريخي"
                },
                {
                    question: "من أخرج فيلم Troy؟",
                    options: ["Wolfgang Petersen", "Ridley Scott", "Oliver Stone", "Zack Snyder"],
                    correct: 0,
                    fact: "مقتبس من ملحمة الإلياذة لهوميروس"
                },
                {
                    question: "من بطل فيلم Alexander؟",
                    options: ["Jared Leto", "Anthony Hopkins", "Colin Farrell", "Val Kilmer"],
                    correct: 2,
                    fact: "أخرج Oliver Stone هذا الفيلم عن الإسكندر الأكبر"
                },
                {
                    question: "من أخرج فيلم The Patriot؟",
                    options: ["Roland Emmerich", "Mel Gibson", "Ridley Scott", "Michael Bay"],
                    correct: 0,
                    fact: "يدور حول حرب الاستقلال الأمريكية"
                },
                {
                    question: "من بطلة فيلم Elizabeth؟",
                    options: ["Cate Blanchett", "Helen Mirren", "Judi Dench", "Emma Thompson"],
                    correct: 0,
                    fact: "ترشحت Cate Blanchett لجائزة أفضل ممثلة مساعدة"
                },
                {
                    question: "من أخرج فيلم The King's Speech؟",
                    options: ["Tom Hooper", "Stephen Frears", "Danny Boyle", "Joe Wright"],
                    correct: 0,
                    fact: "فاز الفيلم بأربع جوائز أوسكار"
                },
                {
                    question: "من بطل فيلم Lincoln؟",
                    options: ["Daniel Day-Lewis", "Tommy Lee Jones", "Joseph Gordon-Levitt", "David Strathairn"],
                    correct: 0,
                    fact: "فاز Daniel Day-Lewis بجائزة الأوسكار الثالثة عن هذا الدور"
                },
                {
                    question: "من أخرج فيلم Apocalypto؟",
                    options: ["Mel Gibson", "Alejandro González Iñárritu", "Alfonso Cuarón", "Guillermo del Toro"],
                    correct: 0,
                    fact: "يدور حول حضارة المايا القديمة"
                },
                {
                    question: "من بطل فيلم Master and Commander؟",
                    options: ["Russell Crowe", "Paul Bettany", "James D'Arcy", "Edward Woodall"],
                    correct: 0,
                    fact: "حصل الفيلم على عشرة ترشيحات للأوسكار"
                },
                {
                    question: "من أخرج فيلم The Mission؟",
                    options: ["Roland Joffé", "Werner Herzog", "Terrence Malick", "Peter Weir"],
                    correct: 0,
                    fact: "فاز الفيلم بجائزة السعفة الذهبية في مهرجان كان"
                },
                {
                    question: "من بطل فيلم The Last Samurai؟",
                    options: ["Tom Cruise", "Ken Watanabe", "Timothy Spall", "Billy Connolly"],
                    correct: 0,
                    fact: "يصور الفيلم نهاية عصر الساموراي في اليابان"
                },
                {
                    question: "من أخرج فيلم Spartacus؟",
                    options: ["Stanley Kubrick", "William Wyler", "Cecil B. DeMille", "Joseph L. Mankiewicz"],
                    correct: 0,
                    fact: "من أشهر أفلام Stanley Kubrick التاريخية"
                },
                {
                    question: "من بطل فيلم Amadeus؟",
                    options: ["F. Murray Abraham", "Tom Hulce", "Jeffrey Jones", "Simon Callow"],
                    correct: 0,
                    fact: "فاز الفيلم بثماني جوائز أوسكار"
                }
            ]
        },
        {
            id: 10,
            title: "نجوم السينما العالمية",
            questions: [
                {
                    question: "عن أي فيلم فاز Marlon Brando بأول جائزة أوسكار؟",
                    options: ["The Godfather", "On the Waterfront", "A Streetcar Named Desire", "Last Tango in Paris"],
                    correct: 1,
                    fact: "فاز Brando بجائزة أفضل ممثل عن On the Waterfront في عام 1955"
                },
                {
                    question: "كم عدد جوائز الأوسكار التي فازت بها Katharine Hepburn؟",
                    options: ["4", "3", "2", "1"],
                    correct: 0,
                    fact: "تحمل Katharine Hepburn الرقم القياسي لأكثر جوائز أوسكار للتمثيل"
                },
                {
                    question: "من أصغر ممثل يفوز بجائزة الأوسكار؟",
                    options: ["Adrien Brody", "Timothy Hutton", "Richard Dreyfuss", "Nicolas Cage"],
                    correct: 0,
                    fact: "فاز Adrien Brody بالجائزة عن The Pianist وعمره 29 عاماً"
                },
                {
                    question: "من أول ممثل أسيوي يفوز بجائزة الأوسكار لأفضل ممثل؟",
                    options: ["Yul Brynner", "Ben Kingsley", "Ken Watanabe", "Jackie Chan"],
                    correct: 0,
                    fact: "فاز Yul Brynner عن The King and I في عام 1956"
                },
                {
                    question: "من أكثر الممثلين ترشيحاً لجائزة الأوسكار؟",
                    options: ["Jack Nicholson", "Peter O'Toole", "Al Pacino", "Robert De Niro"],
        correct: 0,
                    fact: "حصل Jack Nicholson على 12 ترشيحاً للأوسكار"
    },
    {
                    question: "من أول ممثلة آسيوية تفوز بجائزة الأوسكار؟",
                    options: ["Miyoshi Umeki", "Michelle Yeoh", "Awkwafina", "Sandra Oh"],
        correct: 0,
                    fact: "فازت Miyoshi Umeki بالجائزة عن Sayonara في عام 1957"
    },
    {
                    question: "من الممثل الحائز على أكبر عدد من جوائز الأوسكار؟",
                    options: ["Daniel Day-Lewis", "Jack Nicholson", "Walter Brennan", "Spencer Tracy"],
        correct: 0,
        fact: "فاز Daniel Day-Lewis بثلاث جوائز أوسكار لأفضل ممثل"
                },
                {
                    question: "من أصغر ممثلة تفوز بجائزة الأوسكار؟",
                    options: ["Tatum O'Neal", "Anna Paquin", "Jennifer Lawrence", "Marlee Matlin"],
                    correct: 0,
                    fact: "فازت Tatum O'Neal بالجائزة عن Paper Moon وعمرها 10 سنوات"
                },
                {
                    question: "من الممثل الذي فاز بجائزة الأوسكار بعد وفاته؟",
                    options: ["Heath Ledger", "Peter Finch", "James Dean", "Philip Seymour Hoffman"],
                    correct: 0,
                    fact: "فاز Heath Ledger بالجائزة عن دوره في The Dark Knight"
                },
                {
                    question: "من أول ممثلة تفوز بمليون دولار عن دور واحد؟",
                    options: ["Elizabeth Taylor", "Marilyn Monroe", "Audrey Hepburn", "Grace Kelly"],
                    correct: 0,
                    fact: "كان ذلك عن دورها في Cleopatra عام 1963"
                },
                {
                    question: "من الممثل الحائز على أكبر عدد من الترشيحات دون الفوز؟",
                    options: ["Peter O'Toole", "Richard Burton", "Albert Finney", "Glenn Close"],
                    correct: 0,
                    fact: "حصل Peter O'Toole على 8 ترشيحات دون الفوز بالجائزة"
                },
                {
                    question: "من أول ممثل من أصل لاتيني يفوز بالأوسكار؟",
                    options: ["José Ferrer", "Anthony Quinn", "Benicio del Toro", "Javier Bardem"],
                    correct: 0,
                    fact: "فاز José Ferrer بالجائزة عن Cyrano de Bergerac في عام 1950"
                },
                {
                    question: "من الممثلة التي فازت بأوسكار عن أقصر ظهور؟",
                    options: ["Beatrice Straight", "Judi Dench", "Gloria Grahame", "Rita Moreno"],
                    correct: 0,
                    fact: "فازت عن دور استمر 5 دقائق و40 ثانية في Network"
                },
                {
                    question: "من أول ممثلة تفوز بجائزة الأوسكار مرتين؟",
                    options: ["Luise Rainer", "Bette Davis", "Ingrid Bergman", "Olivia de Havilland"],
                    correct: 0,
                    fact: "فازت Luise Rainer بالجائزة في عامين متتاليين 1936 و1937"
                },
                {
                    question: "من الممثل الوحيد الذي فاز بالأوسكار عن دور ناطق وآخر صامت؟",
                    options: ["Emil Jannings", "Charlie Chaplin", "Douglas Fairbanks", "John Gilbert"],
                    correct: 0,
                    fact: "فاز Emil Jannings في أول حفل للأوسكار عام 1929"
                },
                {
                    question: "من أكبر ممثل يفوز بجائزة الأوسكار؟",
                    options: ["Christopher Plummer", "Henry Fonda", "George Burns", "John Gielgud"],
                    correct: 0,
                    fact: "فاز Christopher Plummer وعمره 82 عاماً عن Beginners"
                },
                {
                    question: "من أول ممثلة من الشرق الأوسط تفوز بالأوسكار؟",
                    options: ["Shohreh Aghdashloo", "Hiam Abbass", "Nadine Labaki", "Golshifteh Farahani"],
                    correct: 0,
                    fact: "ترشحت Shohreh Aghdashloo لجائزة أفضل ممثلة مساعدة"
                },
                {
                    question: "من الممثل الوحيد الذي فاز بالأوسكار عن دور شرير في فيلم كوميدي؟",
                    options: ["Kevin Kline", "Joe Pesci", "Alan Arkin", "Walter Matthau"],
                    correct: 0,
                    fact: "فاز Kevin Kline عن A Fish Called Wanda"
                }
            ]
        }
    ]
};

const quizService = {
    getMovieExpertQuiz: () => {
        return movieExpertQuiz;
    },

    getCategoryById: (id) => {
        return movieExpertQuiz.categories.find(category => category.id === id);
    },

    getRandomCategory: () => {
        const randomIndex = Math.floor(Math.random() * movieExpertQuiz.categories.length);
        return movieExpertQuiz.categories[randomIndex];
    },

    shuffleQuestions: (questions) => {
        return questions.map(question => {
            // Créer un tableau d'indices pour les options
            const indices = question.options.map((_, index) => index);
            // Mélanger les indices
            const shuffledIndices = indices.sort(() => Math.random() - 0.5);
            
            // Réorganiser les options selon les indices mélangés
            const shuffledOptions = shuffledIndices.map(i => question.options[i]);
            
            // Trouver la nouvelle position de la bonne réponse
            const newCorrectIndex = shuffledIndices.indexOf(question.correct);
            
            return {
                ...question,
                options: shuffledOptions,
                correct: newCorrectIndex
            };
        }).sort(() => Math.random() - 0.5);
    }
};

export default quizService; 