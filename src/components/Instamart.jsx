import { useState } from "react";

const Section = ({ title, description, isVisible, setIsVisible}) => {

    return (
        <div className="border border-black p-2 m-2">
            <h3 className="font-bold">{title}</h3>
            {/* Basic Accordion */}
            {!isVisible ? <button className="underline font-bold" onClick={() => setIsVisible(true)}>
                Show
            </button> :
                <button className="underline font-bold" onClick={() => setIsVisible(false)}>
                    Hide
                </button>}
            {isVisible && <p>{description}</p>}
        </div>
    )
}

const Instamart = () => {
    // const [sectionConfig, setSectionConfig] = useState({
    //     showAbout:false,
    //     showTeam:false,
    //     showCareers:false 
    // });
    const [isVisibleSection, setIsVisibleSection] = useState("About");
    return (
        <>
            <h1 className="text-3xl font-bold italic p-2 m-2">
                Order groceries from ExpressEats
            </h1>
            <Section title={"About Instamart"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                // isVisible={sectionConfig.showAbout}
                // setIsVisible={()=>setSectionConfig({
                //     showAbout:true,showTeam:false, showCareers:false
                // })}
                isVisible={isVisibleSection==="About"}
                setIsVisible={()=>setIsVisibleSection("About")}
            />
            <Section title={"Team Instamart"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                // isVisible={sectionConfig.showTeam}
                // setIsVisible={()=>setSectionConfig({
                //     showAbout:false,showTeam:true, showCareers:false
                // })}
                isVisible={isVisibleSection==="Team"}
                setIsVisible={()=>setIsVisibleSection("Team")}
            />
            <Section title={"Careers"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
                // isVisible={sectionConfig.showCareers}    
                // setIsVisible={()=>setSectionConfig({
                //     showAbout:false,showTeam:false, showCareers:true
                // })} 
                isVisible={isVisibleSection==="Careers"} 
                setIsVisible={()=>setIsVisibleSection("Careers")}          
            />
        </>
    )
}

export default Instamart;