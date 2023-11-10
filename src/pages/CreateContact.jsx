import React, { useState } from 'react'
import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { useCreateContentMutation} from "../services/api/contentApi"
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { Button } from '@mantine/core';

const CreateContact = () => {
  const notify = () => toast.success('Content is Created');

    const form = useForm({
        initialValues: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
    
        validate: {
          // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
      });
    
      const [createContent] = useCreateContentMutation();
      const [loading,setLoading] = useState(false);
      const token = Cookies.get("token");
      const nav = useNavigate();
      return (
        <div className="  flex justify-center items-center mt-20">
          <form
            onSubmit={form.onSubmit(async (values) => {
              setLoading(true);
              const { data } = await createContent({ token, content: values });
                
              if (data?.success) {
                notify()
                setLoading(false);
                nav("/");
              }
              
            })}
            className=" w-96 p-7 flex flex-col gap-10 shadow-lg "
          >
            <h2>Create</h2>
            <TextInput 
              placeholder="Enter Your Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              placeholder="Enter Your Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              placeholder="Enter Your Phone"
              {...form.getInputProps("phone")}
            />
            <TextInput
              placeholder="Enter Your Address"
              {...form.getInputProps("address")}
            />
            <div className=' flex items-center justify-between gap-3'>
            
            <button className=" text-blue-500 border outline outline-offset-2 outline-1 rounded-sm w-2/4" type="submit">
              <Link to={'/'}>
                Cancel
              </Link>
            </button>
            
              <Button disabled={loading} className=" bg-blue-500 text-white py-1 w-2/4 rounded-sm" type="submit">
                Create
              </Button>
            </div>
          </form>
        </div>
      );
    
  
}

export default CreateContact