/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import * as db from "../../../database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modules-controls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./module-control-buttons";
import LessonControlButtons from "./lesson-control-buttons";

import { useState } from "react";
export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);  return (
    <div>
      <div>
        <ModulesControls />
        <br />
        <br />
        <br />
        <br />
        <ListGroup className="rounded-0" id="wd-modules">
          {modules
            .filter((module: any) => module.course === cid)
            .map((module: any) => (
              <ListGroupItem
                key={module._id}
                className="wd-module p-0 mb-5 fs-5 border-gray"
              >
                <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" /> {module.name}
                  <ModuleControlButtons />
                </div>
                {module.lessons && (
                  <ListGroup className="wd-lessons rounded-0">
                    {module.lessons.map(
                      (lesson: { _id: string; name: string }) => (
                        <ListGroupItem
                          key={lesson._id}
                          className="wd-lesson p-3 ps-1"
                        >
                          <BsGripVertical className="me-2 fs-3" />
                          {lesson.name} <LessonControlButtons />
                        </ListGroupItem>
                      ),
                    )}
                  </ListGroup>
                )}
              </ListGroupItem>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}
