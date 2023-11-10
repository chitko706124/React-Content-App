import { TextInput, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/api/authApi";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const Register = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 5
          ? "Password should have at least 5 words(letters,words or both) "
          : null,
    },
  });

  const notify = (msg) => toast.success(`${msg}`);
  const errorMsg = (error,pass = null) => toast.error(`${error} ${pass !== null ? pass[0] : ''} ${pass !== null ? pass[1] : ''}`);

  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  return (
    <div className=" ">
      <div>
        <div className={token ? "hidden" : "mt-5 ml-5 flex gap-3"}>
          <img src="/src/assets/contact.svg" className=" w-[30px]" alt="" />
          <p className=" font-bold text-slate-400 text-2xl">Contacts</p>
        </div>
        <div className="flex   lg:flex-row flex-col-reverse lg:gap-3  items-center justify-evenly mt-10">
          <div className="">
            <img
              src=" https://img.freepik.com/premium-vector/cartoon-hand-using-smartphone-cellphone-screen-scrolling-flat-vector-illustration_627510-561.jpg?w=2000"
              alt=""
              className=" w-[500px] h-[80vh] object-contain transition-all hover:translate-x-5"
            />
          </div>
          <form
            onSubmit={form.onSubmit((values) => {


              fetch('https://contact-app.mmsdev.site/api/v1/register', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  'accept': 'application/json',
                  
                },
                body: JSON.stringify(values)
              })
              .then(response => response.json())
              .then(data => {
                if (data?.success) {
                  notify(data?.message);
                  navigate(`/login`);
                }
                if(data?.errors){
                  console.log(data?.errors);
                  errorMsg(data?.errors?.email,data?.errors?.password);
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });

              // try {
              //   const { data } = await register(values);
              //   console.log(data);
              //   if (data?.success) {
              //     notify();
              //     navigate(`/login`);
              //   }
              // }catch (e) {
              //   console.log(e);
              // }
            })}
            action=""
            className=" lg:w-[450px]  sm:w-[500px]  w-[calc(100%-10%)]"
          >
            <div className=" bg-white shadow-lg p-5 flex flex-col gap-3 ">
              <h1 className=" text-2xl mb-5 font-bold">
                Register your account
              </h1>
              <div className="flex flex-col gap-4">
                <div className="">
                  <p className=" font-bold text-gray-500">Name</p>
                  <TextInput
                    {...form.getInputProps("name")}
                    placeholder="Your name"
                    description="Your username must be added"
                    withAsterisk
                    className="w-full"
                  />
                </div>

                <div className="">
                  <p className=" font-bold text-gray-500">Email</p>
                  <TextInput
                    {...form.getInputProps("email")}
                    placeholder="Enter your email"
                    description="Email must contain '@gmail.com' besides your char "
                    withAsterisk
                    className="w-full "
                  />
                </div>

                <div className="">
                  <p className=" font-bold text-gray-500">Password</p>

                  <PasswordInput
                    {...form.getInputProps("password")}
                    placeholder="Password"
                    description="Password must include at least one letter, number and special character"
                    withAsterisk
                    className="w-full"
                  />
                </div>

                <div className="">
                  <p className=" font-bold text-gray-500">
                    Password confirmation
                  </p>

                  <PasswordInput
                    {...form.getInputProps("password_confirmation")}
                    placeholder="Confirm Password"
                    description="Password must include at least one letter, number and special character"
                    withAsterisk
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <p className=" font-bold text-gray-500">
                    Already have an account?
                  </p>
                  <Link to={`/login`}>
                    <p className=" underline  text-blue-400">Login</p>
                  </Link>
                </div>
                <div className="">
                  <button className=" bg-blue-700 hover:bg-blue-800 text-white p-2 w-full rounded-md mt-3">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
