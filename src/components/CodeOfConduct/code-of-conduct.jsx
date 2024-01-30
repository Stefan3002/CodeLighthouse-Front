import './code-of-conduct.css'
const CodeOfConduct = (type='regular') => {
    if(type === 'regular')
    return (
        <div className='code-of-conduct'>
            <h2>Community Code of Conduct</h2>
            <p>Welcome to <strong>CodeLighthouse!</strong></p>
            <p>We are committed to providing a welcoming and inclusive space for all community members. By participating in CodeLighthouse challenges, you agree to abide by this Code of Conduct. This Code applies to all interactions within the CodeLighthouse community, including but not limited to challenges, discussions, and feedback.
            </p>
            <ol>
                <li>
                    <strong>Be Respectful</strong>
                    <br/>
                    Respect and consideration for others are fundamental. Treat all community members with kindness and courtesy. Disagreements are natural, but be constructive and refrain from personal attacks or disrespectful behavior.
                </li>
                <li>
                    <strong>Inclusive Language</strong>
                    <br/>
                    Use inclusive language that promotes a positive and supportive atmosphere. Avoid offensive or exclusionary comments related to race, gender, sexual orientation, disability, or any other personal attributes.
                </li>
                <li>
                    <strong>Collaboration Over Competition</strong>
                    <br/>
                    CodeLighthouse is a platform for learning and collaboration. Encourage and support fellow participants. Share insights, provide constructive feedback, and celebrate each other's achievements.
                </li>
                <li>
                    <strong>No Harassment or Bullying</strong>
                    <br/>
                    Harassment and bullying will not be tolerated. This includes, but is not limited to, offensive comments, intimidation, stalking, or unwelcome attention. If you witness or experience harassment, report it to the CodeLighthouse administrators.
                </li>
                <li>
                    <strong>Privacy and Consent</strong>
                    <br/>
                    Respect the privacy and consent of others. Do not share personal information without explicit consent. Be cautious when discussing sensitive topics, and be aware that different individuals may have different boundaries.
                </li>
                <li>
                    <strong>Focus on Learning</strong>
                    <br/>
                    CodeLighthouse is a platform for learning and improvement. Focus on the educational aspects of challenges and discussions. Help others grow by sharing knowledge and experiences.
                </li>
                <li>
                    <strong>Follow Challenge Guidelines</strong>
                    <br/>
                    Adhere to the guidelines provided for each challenge. Respect the challenge author's intentions and rules. If you have questions or concerns, communicate respectfully and seek clarification.
                </li>
                <li>
                    <strong>Report Issues</strong>
                    <br/>
                    If you encounter behavior that violates this Code of Conduct, or if you have concerns about the community environment, please report it to the CodeLighthouse administrators. We are here to address and resolve issues promptly.
                </li>
                <li>
                    <strong>Compliance with Laws</strong>
                    <br/>
                    Ensure that your contributions and interactions comply with applicable laws and regulations. CodeLighthouse reserves the right to take appropriate action if there are violations.
                </li>
                <li>
                    <strong>CodeLighthouse Administrators</strong>
                    <br/>
                    Follow the instructions and decisions of CodeLighthouse administrators. They are here to facilitate a positive community environment and resolve any conflicts that may arise.
                </li>

            </ol>
            <p>Read <a href="#"><b>full Code of Conduct</b></a>.</p>
        </div>
    )
    else
        if(type === 'chat-bot')
            return (
                <div className='code-of-conduct'>
                    <h2>Chat Bot (Llama) Code of Conduct</h2>
                    <p>Welcome to <strong>Llama</strong> chat assistant</p>
                    <p>We are committed to providing a welcoming and inclusive space for all community members. By participating in CodeLighthouse challenges, you agree to abide by this Code of Conduct. This Code applies to all interactions within the CodeLighthouse community, including but not limited to challenges, discussions, and feedback.
                    </p>
                    <ol>
                        <li>
                            <strong>Be Respectful</strong>
                            <br/>
                            Respect and consideration for others are fundamental. Treat all community members with kindness and courtesy. Disagreements are natural, but be constructive and refrain from personal attacks or disrespectful behavior.
                        </li>
                        <li>
                            <strong>Inclusive Language</strong>
                            <br/>
                            Use inclusive language that promotes a positive and supportive atmosphere. Avoid offensive or exclusionary comments related to race, gender, sexual orientation, disability, or any other personal attributes.
                        </li>
                        <li>
                            <strong>Collaboration Over Competition</strong>
                            <br/>
                            CodeLighthouse is a platform for learning and collaboration. Encourage and support fellow participants. Share insights, provide constructive feedback, and celebrate each other's achievements.
                        </li>
                        <li>
                            <strong>No Harassment or Bullying</strong>
                            <br/>
                            Harassment and bullying will not be tolerated. This includes, but is not limited to, offensive comments, intimidation, stalking, or unwelcome attention. If you witness or experience harassment, report it to the CodeLighthouse administrators.
                        </li>
                        <li>
                            <strong>Privacy and Consent</strong>
                            <br/>
                            Respect the privacy and consent of others. Do not share personal information without explicit consent. Be cautious when discussing sensitive topics, and be aware that different individuals may have different boundaries.
                        </li>
                        <li>
                            <strong>Focus on Learning</strong>
                            <br/>
                            CodeLighthouse is a platform for learning and improvement. Focus on the educational aspects of challenges and discussions. Help others grow by sharing knowledge and experiences.
                        </li>
                        <li>
                            <strong>Follow Challenge Guidelines</strong>
                            <br/>
                            Adhere to the guidelines provided for each challenge. Respect the challenge author's intentions and rules. If you have questions or concerns, communicate respectfully and seek clarification.
                        </li>
                        <li>
                            <strong>Report Issues</strong>
                            <br/>
                            If you encounter behavior that violates this Code of Conduct, or if you have concerns about the community environment, please report it to the CodeLighthouse administrators. We are here to address and resolve issues promptly.
                        </li>
                        <li>
                            <strong>Compliance with Laws</strong>
                            <br/>
                            Ensure that your contributions and interactions comply with applicable laws and regulations. CodeLighthouse reserves the right to take appropriate action if there are violations.
                        </li>
                        <li>
                            <strong>CodeLighthouse Administrators</strong>
                            <br/>
                            Follow the instructions and decisions of CodeLighthouse administrators. They are here to facilitate a positive community environment and resolve any conflicts that may arise.
                        </li>

                    </ol>
                    <p>Read <a href="#"><b>full Code of Conduct</b></a>.</p>
                </div>

            )

}
export default CodeOfConduct