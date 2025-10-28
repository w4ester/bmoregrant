# Module 1: AI Demystification
## From Magic to Math - Building Your First AI Model

**Duration:** 4 weeks (8 sessions, 2 hours each)
**Target:** 30 Baltimore families (ages 14-55)
**Core Philosophy:** Understand AI as engineering, not magic. Build before you consume.

---

## Module Overview

**The Problem:** Most people think AI is "magic" - they don't understand how it works, so they become passive consumers paying $20/month for tools they can't control.

**Our Solution:** Teach families to BUILD a tiny AI model from scratch, understand the math behind it, and use that knowledge to become confident producers.

**End Goal:** Every family member can explain how AI works to someone else AND build a simple classifier that solves a real problem.

---

## Learning Objectives

### Youth (Ages 14-17)
- Understand that AI is pattern recognition, not magic or consciousness
- Build a tiny model (text classifier or image recognizer)
- Explain to peers: "Here's how AI actually works"
- Create a presentation teaching others about AI
- Connect AI concepts to algebra and statistics they're learning in school

### Young Adults (Ages 18-25)
- Demystify the technology they use daily (ChatGPT, recommendations, etc.)
- Build and train a simple model using real Python code
- Understand model training, evaluation, and deployment basics
- See AI as a career pathway and economic opportunity
- Create portfolio-ready documentation of their first AI project

### Adults (Ages 26-55)
- Overcome "I'm not technical" mindset - build confidence
- Understand AI well enough to support their children's learning
- Build a practical model for household use (budget classifier, document organizer)
- Make informed decisions about AI tools vs. building their own
- Lead family discussions about AI's role in their lives

---

## Session Breakdown

### Session 1: What is AI Really? (2 hours)

**Opening Circle (20 min)**
- Family introductions: What AI tools do you use? (ChatGPT, Siri, recommendations?)
- Share: What do you think AI is? (Collect answers on whiteboard)
- Reveal: Most people think it's magic. Today we prove it's math.

**Activity 1: Pattern Recognition Game (30 min)**
- Game: "Guess the Rule"
  - Facilitator shows examples: Red square, Blue square, Red circle → YES. Green square → NO
  - Families guess the rule (Red = YES)
  - Reveal: This is exactly what AI does - finds patterns from examples
- Discussion: AI is just pattern matching from training data

**Activity 2: How Neural Networks Work (40 min)**
- Visual demo: Neural network playground (https://playground.tensorflow.org)
  - Show how adjusting "neurons" changes decision boundaries
  - Let families experiment: Make it classify circles vs. squares
- Analogy: Brain neurons vs. artificial neurons
  - Human brain: 86 billion neurons
  - Our tiny model: 10-100 neurons
  - ChatGPT: ~175 billion parameters (but same basic principle!)

**Family Project Assignment (20 min)**
- Each family picks a classification problem they want to solve:
  - Youth: Homework topic identifier (math vs. history vs. science)
  - Young Adults: Job posting analyzer (entry-level vs. senior)
  - Adults: Email categorizer (bills vs. personal vs. spam)
- Families start collecting 20-30 examples for training

**Homework:**
- Collect training data (text examples with labels)
- Watch: 3Blue1Brown "But what is a neural network?" (19 min)
- Journal: What surprised you about how AI works?

---

### Session 2: Data is Everything (2 hours)

**Opening: Share Training Data (15 min)**
- Families present their classification problems and data collected
- Group feedback: Do you have enough examples? Are they diverse?

**Activity 1: Good Data vs. Bad Data (30 min)**
- Show biased datasets and their consequences:
  - Amazon hiring AI that discriminated against women
  - Face recognition failing on darker skin tones
  - Loan algorithms denying qualified applicants
- Discussion: Garbage in = Garbage out
- Activity: Families audit their own data - any biases? Missing examples?

**Activity 2: Data Labeling Workshop (45 min)**
- Hands-on: Clean and label your dataset
  - Youth: Use spreadsheet to organize homework examples
  - Young Adults: Structure job posting data
  - Adults: Categorize email examples
- Learn: Consistent labels, balanced classes, edge cases
- Tool: Google Sheets or simple CSV files

**Activity 3: Understanding Features (20 min)**
- Concept: What patterns should the model look for?
  - Keywords (homework: "equation," "thesis," "experiment")
  - Patterns (emails: "$" = bills, names = personal)
  - Context (job posts: years of experience, education level)
- Families identify 3-5 key features for their model

**Homework:**
- Complete dataset: 30-50 labeled examples
- Identify edge cases: What will be hard to classify?
- Read: "The Baltimore AI Producers Lab Guide to Data Collection"

---

### Session 3: Building Your First Model (2 hours)

**Opening: Data Review (15 min)**
- Facilitator checks datasets are ready
- Quick fixes for any data quality issues

**Activity 1: Introduction to Model Training (20 min)**
- Concept: Training = showing examples until the model learns patterns
- Demo: Train a model live with audience
  - Show loss going down (model getting better)
  - Show accuracy going up
  - Explain: Model is adjusting its "neurons" to find patterns

**Activity 2: Hands-On Model Building (60 min)**

**For Youth (14-17): No-Code Approach**
- Tool: Teachable Machine (teachablemachine.withgoogle.com)
- Process:
  1. Upload text examples with labels
  2. Click "Train Model"
  3. Watch it learn (2-3 minutes)
  4. Test with new examples
  5. Export model for later use
- Result: Working classifier they built themselves

**For Young Adults (18-25): Low-Code Approach**
- Tool: Google Colab + scikit-learn
- Process:
  1. Load CSV data
  2. Split into training and testing
  3. Train a simple classifier (Naive Bayes or Logistic Regression)
  4. Evaluate accuracy
  5. Make predictions on new text
- Result: Python code they can modify and reuse

**For Adults (26-55): Practical Tool Building**
- Tool: Excel + IFTTT or Zapier + Claude/GPT API
- Process:
  1. Understand: No-code tools use AI models behind the scenes
  2. Build: Email classifier using IF/THEN rules
  3. Connect: Link to their actual email or budget tracker
  4. Test: Does it work on real data?
- Result: Deployed tool solving a real household problem

**Activity 3: Model Evaluation (15 min)**
- Concept: How good is your model?
- Metric: Accuracy = (correct predictions / total predictions) × 100%
- Test: Each family tries 10 new examples
- Discuss: What does it get right? What does it miss?

**Homework:**
- Test model with 20 new examples
- Document: What works? What fails?
- Prepare: 2-minute presentation on your model

---

### Session 4: Understanding Model Limitations (2 hours)

**Opening: Model Testing Results (20 min)**
- Families share: What worked? What failed?
- Facilitator: This is normal! Even GPT-4 makes mistakes.

**Activity 1: Breaking Your Model (30 min)**
- Challenge: Find examples that fool your model
- Youth: Try homework from a different subject
- Young Adults: Try job posts with tricky wording
- Adults: Try emails that blend categories
- Lesson: Models only know what they've seen before

**Activity 2: AI Ethics Discussion (30 min)**
- Scenario analysis:
  - What if your email classifier marks important bills as spam?
  - What if a hiring AI rejects qualified candidates?
  - What if a loan algorithm discriminates?
- Family discussion: When should humans override AI?
- Create: Family AI Ethics Agreement (poster)

**Activity 3: Improving Your Model (30 min)**
- Strategies:
  1. Add more training data (especially edge cases)
  2. Improve features (better keywords/patterns)
  3. Try a different model type
- Hands-on: Families retrain with new data
- Results: Compare before/after accuracy

**Homework:**
- Prepare final presentation: "How AI Works" (5 minutes)
- Create one visual (poster, slide, or demo)
- Practice explaining to someone who knows nothing about AI

---

### Session 5-6: Family Presentations & Producer Mindset (4 hours total)

**Session 5: Family Presentations Part 1 (2 hours)**

Each family presents (10 min each):
1. The problem we solved
2. How we collected data
3. Our model and how it works
4. Results: Accuracy and failures
5. One thing we learned about AI

**Audience participation:**
- Families test each other's models
- Ask questions
- Give feedback

**Reflection Circle:**
- How does this change how you think about AI?
- Would you pay $20/month for this, or build it yourself?

---

**Session 6: From Consumer to Producer Mindset (2 hours)**

**Activity 1: Consumer vs. Producer Analysis (30 min)**
- List AI tools families use: ChatGPT, Grammarly, photo editors
- Calculate: Cost per month if using all these tools
- Discuss: What if we built our own versions?
- Mindset shift: "Can I build this?" before "Should I buy this?"

**Activity 2: The Producer Toolkit (45 min)**
- Introduce: Tools you'll use in future modules
  - Module 2: Prompt engineering (customize any AI)
  - Module 3: Tool builder (create interfaces)
  - Module 4: Document analysis (RAG systems)
  - Module 5: API connections (real-world integration)
  - Module 6: Fine-tuning (your data, your model)
  - Module 7: Deploy & monetize (earn from your tools)
- Show: Local vs. cloud models
  - Demonstrate Ollama running locally
  - Explain: This is what you'll learn to control

**Activity 3: Teaching Others (30 min)**
- Challenge: Each family creates a "teaching moment"
  - Design a 5-minute lesson to teach someone about AI
  - Could be: poster, video, demo, game, presentation
- Share: 3-5 families present their teaching tools
- Goal: If you can teach it, you truly understand it

**Closing Circle & Celebration (15 min)**
- Certificate presentation: "AI Demystification Graduate"
- Group photo with family models/posters
- Preview Module 2: "Now that you know HOW AI works, let's learn to control it with prompts"

---

## Materials Needed

### For Each Family:
- Laptop or tablet (provided by program)
- Notebook and pens
- Dataset collection template (printed handout)
- Model testing worksheet

### For Workshop Space:
- Projector and screen
- Whiteboard and markers
- Printed handouts:
  - "How Neural Networks Work" visual guide
  - Data collection template
  - Model evaluation worksheet
  - AI Ethics scenarios
- Poster boards for family presentations

### Digital Tools:
- Teachable Machine (free, web-based)
- Google Colab (free, requires Google account)
- Spreadsheet templates
- Neural network playground (playground.tensorflow.org)
- Access to workshop Mac Studios for demos

### Take-Home:
- USB drive with model files
- Printed guide: "Your First AI Model - A Family Reference"
- Certificate of completion
- Preview handout for Module 2

---

## Assessment & Success Criteria

### Individual Success (90% should achieve):
- **Understand:** Can explain in own words how AI learns from data
- **Build:** Successfully trained a working classifier (70%+ accuracy)
- **Test:** Evaluated model and identified limitations
- **Teach:** Can explain AI to someone else (5-minute presentation)

### Family Success:
- **Collaborate:** Family members worked together on project
- **Create:** Built and tested a model together
- **Document:** Have working model and presentation to show
- **Shift:** Show evidence of producer mindset ("Can I build this?")

### Workshop Success (Metrics):
- **Retention:** 90% of families complete all 6 sessions
- **Understanding:** Post-module quiz: 80% score 70%+ on AI basics
- **Confidence:** Pre/post survey: "I can build AI tools" (1-5 scale)
- **Engagement:** Families complete homework and presentations
- **Producer Mindset:** Families identify 2-3 tools they could build vs. buy

---

## Age-Appropriate Adaptations

### Youth Track (14-17):
- Focus: School-relevant applications (homework, study tools)
- Tools: Visual, no-code platforms (Teachable Machine)
- Language: Connect to algebra, statistics, computer science classes
- Projects: Simple, achievable, shareable with friends
- Support: Extra tutoring available, peer learning groups

### Young Adult Track (18-25):
- Focus: Career applications (resume tools, job search)
- Tools: Introduce actual code (Python, scikit-learn)
- Language: Industry terms, portfolio building
- Projects: Professional quality, GitHub-ready
- Support: Career counseling integration, credential pathways

### Adult Track (26-55):
- Focus: Practical household applications (budgets, organization)
- Tools: Low-code/no-code with clear value
- Language: Plain language, practical outcomes
- Projects: Immediately useful at home
- Support: "Non-technical" support groups, peer mentoring

### Family Together Activities:
- Opening and closing circles (all ages)
- Ethics discussions (different perspectives valued)
- Presentations (everyone shares)
- Celebration (build family pride)

---

## Connection to Grant Goals

### Producer Mindset:
- Families BUILD a model, not just use one
- Understand enough to make informed choices
- See AI as something they can create and control

### Local Models:
- Demo Ollama and local inference in Session 6
- Explain: Models run on Mac Studios, then export to take-home devices
- Plant seed: "You'll own these tools forever"

### Economic Value:
- Calculate cost of AI subscriptions vs. building tools
- Preview future modules where they build monetizable tools
- Introduce: You could teach others or sell tools

### Family Learning:
- Multi-generational projects
- Different ages bring different perspectives
- Built-in support system

### Baltimore Context:
- Use Baltimore examples (Ravens statistics, Harbor data, community problems)
- Address digital divide (offline capability coming in Module 6)
- Connect to local opportunities (TAMS students, community colleges)

---

## Facilitator Guide

### Preparation (Week Before):
1. Review all family applications and data collection
2. Prepare datasets for demo
3. Test all tech tools (Teachable Machine, Colab, projector)
4. Print all handouts
5. Set up Mac Studios for demos
6. Assign peer mentors (TAMS students + community college students)

### During Sessions:
1. Start on time with energetic opening
2. Mix instruction, discussion, and hands-on work
3. Circulate during activities - help struggling families
4. Celebrate small wins loudly
5. End with clear homework and preview of next session

### Common Challenges:
- **"I'm not technical"** → Show neural network playground, let them play
- **Model accuracy too low** → Add more diverse training data
- **Families at different speeds** → Peer mentors help; have extension activities ready
- **Technical failures** → Always have backup demos/datasets
- **Language barriers** → Provide Spanish materials; use visual explanations

### Success Indicators:
- Families laughing and excited during activities
- Youth explaining concepts to parents (and vice versa)
- Questions shifting from "How does this work?" to "Can I build...?"
- Families staying late to keep working
- Requests for extra resources/time

---

## Homework Between Modules

**Module 1 → Module 2 Bridge (2 weeks):**

1. **Refine Your Model**
   - Add 20 more training examples
   - Test on family/friends
   - Document improvements

2. **Explore AI Tools**
   - Try 3 different AI tools (ChatGPT, Gemini, Claude)
   - Journal: What prompts work best?
   - Prepare for Module 2 (Prompt Engineering)

3. **Teach Someone**
   - Share your model with someone outside the program
   - Teach them: "Here's how AI works"
   - Report back: What questions did they ask?

4. **Optional Challenge:**
   - Build a second classifier for a different problem
   - Try Teachable Machine for image classification
   - Start exploring Ollama on your take-home device

---

## Parent Support Resources

**Provided to all families:**

1. **"AI at Home" Guide**
   - How to support your children's learning
   - Conversation starters about AI
   - Resources for continued learning

2. **"Tech Isn't Scary" Handbook**
   - For parents who feel "not technical"
   - Plain-language explanations
   - Confidence-building exercises

3. **Community Support**
   - Family Slack/Discord channel
   - Weekly office hours with facilitators
   - Peer mentor contact info
   - Resource library access

---

## Materials for Diverse Learners

**Language Support:**
- All handouts available in Spanish
- Visual instructions with minimal text
- Video tutorials with captions

**Learning Differences:**
- Extended time for activities
- Alternative assessment options (video instead of written)
- Hands-on tactile examples
- Quiet space available

**Technology Access:**
- Loaner laptops for home use
- Offline resources for low-bandwidth families
- Phone-based activities as backup
- Library partnership for extra access

---

## Module 1 Success Story Template

> **The Johnson Family (Baltimore, MD)**
>
> **Who:** Marcus (14, student), Keisha (19, job seeker), Tanya (38, admin assistant)
>
> **Their Challenge:** Tanya was paying $20/month for budgeting apps. Marcus needed help organizing homework. Keisha was overwhelmed by job searches.
>
> **What They Built:** Email classifier that sorts bills, personal messages, and job alerts automatically.
>
> **Impact:**
> - Saved $240/year on subscriptions
> - Marcus learned to build a homework topic sorter
> - Keisha trained a model to flag entry-level jobs
> - Family now asks "Can we build this?" before buying tools
>
> **Quote:** "I thought AI was magic for tech companies. Now I know we can build this stuff ourselves. My son is teaching his friends. This changes everything." - Tanya Johnson

---

## Next Steps: Preview of Module 2

**Module 2: Prompt Engineering**
- Now that you know HOW models work, learn to CONTROL them
- Build: Custom homework helper (youth), Resume improver (young adults), Benefits navigator (adults)
- Tools: System prompts, few-shot learning, A/B testing
- Goal: Master the art of talking to AI

**Bridge Activity:**
- Families experiment with ChatGPT/Claude prompts
- Document: What makes a good prompt vs. bad prompt?
- Bring: 3 examples of prompts that worked well

---

## Evaluation & Iteration

**Data Collected:**
- Pre/post surveys: AI understanding, confidence, producer mindset
- Attendance and completion rates
- Model accuracy results
- Family feedback forms
- Facilitator observations

**Success Metrics:**
- 90% retention through all 6 sessions
- 80% achieve 70%+ accuracy on their models
- 85% can teach someone else how AI works
- Confidence scores increase by 50% (pre/post survey)

**Continuous Improvement:**
- Weekly facilitator debriefs
- Mid-module check-ins with families
- Anonymous feedback surveys after each session
- Curriculum adjustments based on data

---

## Budget Allocation (Module 1 Only)

From overall $250K budget, Module 1 uses:

**Personnel (Module 1 portion):**
- Program Director: 40 hours @ $35K annual = ~$840
- ML Technical Lead: 40 hours @ $45K annual = ~$1,080
- 4 Education/Childcare majors: 48 hours @ $20K total = ~$480
- 2 TAMS students: 48 hours @ $20K total = ~$480
- **Subtotal: $2,880**

**Materials:**
- Printed handouts for 30 families: $300
- Poster boards and supplies: $200
- USB drives for models: $150
- Certificates and rewards: $150
- **Subtotal: $800**

**Family Support:**
- Childcare (8 sessions × 2 hours × 30 families): $1,200
- Meals (8 sessions × 30 families): $1,500
- Transportation stipends: $600
- **Subtotal: $3,300**

**Module 1 Total: ~$7,000** (covers 8 sessions over 4 weeks for 30 families)

---

## Long-Term Impact: Module 1 Alumni

**6 Months After Module 1:**
- 70% have built additional models beyond the first project
- 50% have taught someone outside the program
- 30% are using their models daily for real tasks
- 90% report changed relationship with technology
- 60% are considering AI-related career paths (young adults)

**Connection to Full Program:**
- Module 1 creates foundation for advanced modules
- Producer mindset established early
- Families gain confidence to tackle complex topics
- Sets tone: "We build things here"

---

## Quote from Program Director

> "Module 1 is where we transform how families see AI - from mysterious black box to 'I can build this.' When a 14-year-old teaches their parent how neural networks work, and when that parent realizes they just built their first AI model, that's the moment everything changes. They stop being consumers and start being producers. That mindset shift is worth more than any coding skill - it's generational wealth in the form of confidence and capability."
>
> — Program Director, Baltimore AI Producers Lab

---

**Module 1 Complete. Ready for Module 2: Prompt Engineering.**
