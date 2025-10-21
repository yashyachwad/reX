import React,{useState,useContext} from 'react'
import axiosInstance from '../utils/axiosInstance';
import { validateEmail } from '../utils/helper';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import API_PATHS from '../utils/apiPaths';
import { authStyles as styles } from '../assets/dummyStyle';

export default function Login ( {setCurrentPage})  {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();


    const handleLogin =async (e) =>{
        e.preventDefault();

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
                const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password});
                const {token } =response.data;
                if(token){
                    localStorage.setItem('token',token);
                    updateUser(response.data);
                    navigate('/dashboard')
                }
            }
            catch(error){
              setError(error.response?.data?.message ||  "Something went wrong , Please try again.")
            }


    }


  return (
    <div className={styles.container}>
        <div className={styles.headerWrapper}>
            <h3 className={styles.title}>Welcome Back</h3>
            <p className={styles.subtitle}>
                Sign in to continue building amazing resumes
            </p>
        </div>

        {/* form  */}
        <form onSubmit={handleLogin} className={styles.form}>
              <input value={email} onChange={({ target }) =>setEmail(target.value)}
                lable ='Email'
                placeholder = 'example@email.com'
                type = 'email' />

            <input value={password} onChange={({ target }) =>setPassword(target.value)}
                lable ='Password'
                placeholder = 'Min 8 Characters'
                type = 'password' />

            { error && <div className={styles.errorMessage}> {error} </div>   }

            <button type='submit' className={styles.submitButton}>
                Sign in 
            </button>

            <p className={styles.switchText}>
                Don't have an Account ? {' '}
                <button type='button'
                onClick={()=> setCurrentPage('signup')}
                className={styles.switchButton}>
                    Sign Up
                </button>
            </p>

        </form>
      
    </div>
  )
}

