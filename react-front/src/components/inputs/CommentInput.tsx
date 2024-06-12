import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { getToken } from "../../auth";

//CommentInput component, displays the input field for the user to comment on an event
function CommentInput({ id }: { id: string }) {
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    //Handle the submission of the comment creation form
    async function handleSubmit(e: any) {
        e.preventDefault();
        const token = getToken();

        const value = comment.trim();
        if (!value) {
            return;
        }
        try {
            const response = await fetch(`${baseurl}/rest/events/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(value)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setComment('');
                navigate(`/events/${id}`);

            } else {
                console.error('Failed to comment the event');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (

        <Form method="POST" onSubmit={handleSubmit}>
            <label htmlFor="chat" className="sr-only">Your message</label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50/40 dark:bg-gray-700">
                <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                    </svg>
                    <span className="sr-only">Add emoji</span>
                </button>
                <input
                    id="chat"
                    name="comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="Your comment..."
                ></input>
                <button type="submit" className="inline-flex justify-center p-2 text-green-600 rounded-full cursor-pointer hover:bg-green-100 dark:text-green-500 dark:hover:bg-gray-600">
                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                        <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span className="sr-only">Create Comment</span>
                </button>
            </div>
        </Form>
    )
}

export default CommentInput