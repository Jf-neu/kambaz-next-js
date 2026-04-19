/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ListGroup, ListGroupItem, Button, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { FaPlus, FaCheckCircle, FaBan, FaEllipsisV } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RootState } from "../../../store";
import * as client from "./client";
import { setQuizzes, deleteQuiz, updateQuiz, addQuiz } from "./reducer";

function getAvailability(quiz: any) {
  const now = new Date();
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (until && now > until) return "Closed";
  if (available && now < available)
    return `Not available until ${available.toLocaleDateString()}`;
  return "Available";
}

export default function QuizList() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const [lastScores, setLastScores] = useState<Record<string, number | null>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const data = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(data));
    })();
  }, [cid]);

  useEffect(() => {
    if (!isFaculty && quizzes.length > 0) {
      const fetchScores = async () => {
        const scores: Record<string, number | null> = {};
        await Promise.all(
          quizzes.map(async (q: any) => {
            try {
              const attempt = await client.getLastAttempt(q._id);
              scores[q._id] = attempt ? attempt.score : null;
            } catch {
              scores[q._id] = null;
            }
          })
        );
        setLastScores(scores);
      };
      fetchScores();
    }
  }, [quizzes, isFaculty]);

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "New Quiz",
      course: cid,
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const handleDelete = async (quizId: string) => {
    if (!confirm("Delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const handleTogglePublish = async (quiz: any) => {
    const updated = await client.updateQuiz({ ...quiz, published: !quiz.published });
    dispatch(updateQuiz(updated));
  };

  const filtered = quizzes.filter((q: any) =>
    q.title?.toLowerCase().includes(search.toLowerCase())
  );

  const visible = isFaculty ? filtered : filtered.filter((q: any) => q.published);

  return (
    <div id="wd-quizzes">
      <div className="d-flex align-items-center mb-3">
        <InputGroup className="flex-grow-1 me-3">
          <InputGroup.Text><FaMagnifyingGlass /></InputGroup.Text>
          <FormControl
            placeholder="Search for Quiz"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        {isFaculty && (
          <Button variant="danger" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        )}
      </div>

      {visible.length === 0 && (
        <div className="text-muted text-center py-5">
          No quizzes yet.{isFaculty && " Click + Quiz to add one."}
        </div>
      )}

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-0 mb-5 border-gray">
          <div className="p-3 bg-secondary fw-bold fs-5">
            Assignment Quizzes
          </div>
          <ListGroup className="rounded-0">
            {visible.map((quiz: any) => (
              <ListGroupItem key={quiz._id} className="d-flex align-items-start py-3">
                <div className="me-3 pt-1">
                  {isFaculty ? (
                    <span
                      role="button"
                      title={quiz.published ? "Click to unpublish" : "Click to publish"}
                      onClick={() => handleTogglePublish(quiz)}
                    >
                      {quiz.published
                        ? <FaCheckCircle className="text-success fs-5" />
                        : <FaBan className="text-secondary fs-5" />}
                    </span>
                  ) : (
                    quiz.published
                      ? <FaCheckCircle className="text-success fs-5" />
                      : <FaBan className="text-secondary fs-5" />
                  )}
                </div>

                <div className="flex-grow-1">
                  <Link
                    href={`/courses/${cid}/quizzes/${quiz._id}`}
                    className="text-decoration-none text-dark fw-bold"
                  >
                    {quiz.title}
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="fw-semibold">{getAvailability(quiz)}</span>
                    {quiz.dueDate && (
                      <> | <span className="fw-semibold">Due</span> {new Date(quiz.dueDate).toLocaleString()}</>
                    )}
                    {" "}| {quiz.points ?? 0} pts
                    {quiz.questionCount !== undefined && <> | {quiz.questionCount} Questions</>}
                    {!isFaculty && lastScores[quiz._id] !== undefined && lastScores[quiz._id] !== null && (
                      <> | Score: {lastScores[quiz._id]}</>
                    )}
                  </div>
                </div>

                {isFaculty && (
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" className="text-dark p-0" id={`menu-${quiz._id}`}>
                      <FaEllipsisV />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href={`/courses/${cid}/quizzes/${quiz._id}/edit`}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleTogglePublish(quiz)}>
                        {quiz.published ? "Unpublish" : "Publish"}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
