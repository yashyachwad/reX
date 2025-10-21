import React,{ useState, useContext} from 'react'
import { authStyles as styles } from '../assets/dummyStyle'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import API_PATHS from '../utils/apiPaths';
import { Target } from 'lucide-react';

export default function Signup ( {setCurrentPage})  {


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();


 const handleSignup = async (e) =>{
    e.preventDefault();
    if(!fullName){
        setError("Please Enter FullName ")
        return;
    }
    if(!validateEmail(email)) {
        setError("Please Enter a valid Email");
        return;
    }
    if(!password){
        setError("Please Enter Password");
        return;
    }
    setError(" ")

    try{
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            name :fullName,
            email ,
            password,
        });

        const { token } =response.data;
        if(token){
            localStorage.setItem('token', token);
            updateUser(response.data);
            navigate('/dashboard');
        }
    }
    catch(error){
        console.error("Signup error:", error);
        setError(error.response?.data?.message ||  "Something went wrong , Please try again.")
    }



 }

  return (
    <div className={styles.signupContainer}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.signupTitle}> Create Account </h3>
            <p className={styles.signupSubtitle}>Join Thousands of Professionals Today</p>
        </div>


        {/* Form  */}
        <form onSubmit={handleSignup} className={styles.signupForm}>
            <input value={fullName} onChange={({ target }) =>setFullName(target.value)}
                lable ='Full Name'
                placeholder = 'Yash Yachwad'
                type = 'text' />

            <input value={email} onChange={({ target }) =>setEmail(target.value)}
                lable ='Email'
                placeholder = 'example@email.com'
                type = 'email' />

            <input value={password} onChange={({ target }) =>setPassword(target.value)}
                lable ='Password'
                placeholder = 'Min 8 Characters'
                type = 'password' />



            { error && <div className={styles.errorMessage}> {error} </div>   }
            <button type='submit' className={styles.signupSubmit}>
                Create Account
            </button>
        </form>


            {/* Footer  */}
            <p className={styles.switchText}>
                Already have an Account ? {' '}
                <button onClick={() => setCurrentPage('login')}
                type='button' className={styles.signupSwitchButton}>
                    Sign In 
                </button>
            </p>

    </div>
  )
}

