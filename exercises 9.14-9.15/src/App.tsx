// Types

interface HeaderProps {
  name: string
}

interface CourseParts {
  parts: CoursePart[]
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartSpecial | CoursePartBackground;

// Data

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];

// Components

const Header = (props: HeaderProps) => (
    <h1>{props.name}</h1>
)

const Part = ({ part }: { part: CoursePart }) => {
  const title = (
    <h4> {part.name} {part.exerciseCount} </h4>
  );

  let content;

  switch (part.kind) {
    case "basic":
      content = (
        <p><em> {part.description} </em></p>
      ); 
      break;
    case "group":
      content = (
        <p> project exercises {part.groupProjectCount} </p>
      ); 
      break;
    case "background":
      content = (
        <>
          <p><em> {part.description} </em></p>
          <p> submit to {part.backgroundMaterial} </p>
        </>
      ); 
      break;
    case "special":
      content = (
        <>
          <p><em> {part.description} </em></p>
          <p>requirements: {part.requirements.map(r => r + ", ")}</p>
        </>
      );
      break;
    default: content = null;
  }

  return (
    <div>
      {title}
      {content}
    </div>
    
  )
};

const Content = (props: CourseParts) => {
  return (
    <>
      {props.parts.map((part: CoursePart, index) => (
        <Part part={part} key={index}/>
      ))}
    </>
  )
};

const Total = (props: CourseParts) => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
