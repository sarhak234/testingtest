import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


function Questions({ testcode }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = Cookies.get('auth_token');
        const response = await axios.get(`${import.meta.env.VITE_BC_URI}/questions/${token.testcode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data.questions);
      } catch (err) {
        setError('Failed to fetch questions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testcode]);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h3>{question.title}</h3>
          <p>{question.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Questions;
