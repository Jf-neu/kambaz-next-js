/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";
import { RootState } from "../../../../store";
import * as client from "../client";

function Row({ label, value }: { label: string; value: string | number | boolean }) {
  return (
    <tr>
      <td className="text-end fw-bold pe-4 text-muted" style={{ width: "220px" }}>{label}</td>
      <td>{String(value)}</td>
    </tr>
  );
}

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    })();
  }, [qid]);

  if (!quiz) return <div className="p-4">Loading...</div>;

  return (
    <div id="wd-quiz-details" className="p-3">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3 gap-2">
          <Link href={`/courses/${cid}/quizzes/${qid}/preview`}>
            <Button variant="outline-secondary">Preview</Button>
          </Link>
          <Link href={`/courses/${cid}/quizzes/${qid}/edit`}>
            <Button variant="outline-secondary">
              <FaPencilAlt className="me-1" />Edit
            </Button>
          </Link>
        </div>
      )}

      <h2 className="mb-4">{quiz.title}</h2>

      <table className="table table-borderless" style={{ maxWidth: "600px" }}>
        <tbody>
          <Row label="Quiz Type" value={quiz.quizType?.replace(/_/g, " ")} />
          <Row label="Points" value={quiz.points ?? 0} />
          <Row label="Assignment Group" value={quiz.assignmentGroup} />
          <Row label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
          <Row label="Time Limit" value={`${quiz.timeLimit} Minutes`} />
          <Row label="Multiple Attempts" value={quiz.multipleAttempts ? "Yes" : "No"} />
          {quiz.multipleAttempts && (
            <Row label="How Many Attempts" value={quiz.howManyAttempts} />
          )}
          <Row label="Show Correct Answers" value={quiz.showCorrectAnswers} />
          <Row label="Access Code" value={quiz.accessCode || "None"} />
          <Row label="One Question at a Time" value={quiz.oneQuestionAtATime ? "Yes" : "No"} />
          <Row label="Webcam Required" value={quiz.webcamRequired ? "Yes" : "No"} />
          <Row label="Lock Questions After Answering" value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"} />
        </tbody>
      </table>

      <hr />
      <table className="table table-borderless" style={{ maxWidth: "600px" }}>
        <thead>
          <tr>
            <th className="text-center">Due</th>
            <th className="text-center">For</th>
            <th className="text-center">Available from</th>
            <th className="text-center">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{quiz.dueDate || "—"}</td>
            <td className="text-center">Everyone</td>
            <td className="text-center">{quiz.availableDate || "—"}</td>
            <td className="text-center">{quiz.untilDate || "—"}</td>
          </tr>
        </tbody>
      </table>

      {!isFaculty && (
        <div className="mt-4">
          <Button
            variant="danger"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
          >
            Take Quiz
          </Button>
        </div>
      )}
    </div>
  );
}
