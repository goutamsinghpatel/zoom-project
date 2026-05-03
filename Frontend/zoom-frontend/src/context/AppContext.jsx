import { createContext } from "react";
import axios from "axios";
import { useState } from "react";

export const Appcontext=createContext()
export const AppContextProvider=(props)=>{
    axios.defaults.withCredentials=true;
    const backendUrl="http://localhost:3000";
    const [userData,setUserData]=useState("");
    const getHistoryOfUser = async () => {
        try {
            let request = await axios.get(backendUrl+"/api/v1/users/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

      const addToUserHistory = async (meetingCode) => {
        try {
            let request = await axios.post(backendUrl+"/api/v1/users/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

    


    
    const value={
        backendUrl,
        userData,
        setUserData,
        getHistoryOfUser,
        addToUserHistory




    }
    return(
        <Appcontext.Provider value={value}>
            {props.children}
            

        </Appcontext.Provider>
    )
}