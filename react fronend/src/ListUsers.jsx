import { useState, useEffect, useLayoutEffect } from "react";
import { Toaster, toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import './styles/ListUsers.css';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    useLayoutEffect(
        () => {
            console.log("landed on listUsers");

            const makeApi = async () => {
                try {
                    const response = await fetch("https://localhost:44350/getUsers");

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const result = await response.json();
                    console.log(result);

                    setUsers(result);
                    toast.success("Api call successfull");
                }
                catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch users!");
                }
            };

            makeApi();
        }, []
    );
    // useEffect(() => {
    //     console.log("landed on listUsers");
    //     async function makeApi() {
    //         const jsonRes = await fetch("https://localhost:44350/getUsers");
    //         const result = await jsonRes.json();
    //         console.log(result);
    //         setUsers(result);
    //     }
    //     makeApi();
    // }, []);
    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            toast.success(`Successfully added ${searchParams.get('name')}!`);
            searchParams.delete('success');
            searchParams.delete('name');
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);


    return (
        <>
            <Toaster richColors position="bottom-center" />
            {users.length === 0 && (<h1>No users available, please add users</h1>)}

            <div className="userTable">
                <table border="1" cellPadding={10}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.name + index}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.city}</td>
                                <td>{user.pincode}</td>
                                <td>{user.state}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListUsers;