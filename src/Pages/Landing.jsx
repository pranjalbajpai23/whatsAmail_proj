import { Link } from "react-router-dom";


const Landing = () => {
    return <>
        <div className="flex p-4">
            <div className="flex w-3/5 items-center">Lets cut <img src="cut.svg" className="w-10 h-10 p-2" alt="" /> down the hassel of switching between multiple accounts. Introducing WhatsAmail, a platform to check all your emails at one place. Also get your important mails delivered to your whatsaap</div>
            <img className="w-2/5" src="hero.png" alt="" />
        </div>
        <Link to='/mail/inbox'>Get Started</Link>
    </>
}
export default Landing;