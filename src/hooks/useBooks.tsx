import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "../lib/axios";
import { delay, keys, values } from "lodash";

type BookProps = {
  abbrev: string;
  author: string;
  name: string;
  group: string;
  chapter: string | number;
  number: string | number;
  text: string;
};

type BookProviderProps = {
  children?: ReactNode;
};

const Book = createContext({} as BookProps);

interface BookType {
  book: {
    abbrev: {
      en: string;
      pt: string;
    };
    author: string;
    group: string;
    name: string;
    version: string;
  };
  chapter: number;
  number: number;
  text: string;
}

function BookProvider({ children }: BookProviderProps) {
  const [book, setBook] = useState<BookType>();
  const [abbrev, setAbbrev] = useState<string>('pt');
  const [author, setAuthor] = useState<string>('Paulo');
  const [name, setName] = useState<string>('Romanos');
  const [group, setGroup] = useState<string>('Cartas');
  const [chapter, setChapter] = useState<string | number>(4);
  const [number, setNumber] = useState<string | number>(7);
  const [text, setText] = useState<string>("Como são felizes aqueles que têm suas transgressões perdoadas, cujos pecados são apagados.");

  useEffect(() => {
    (async () => {
      await axios
        .get("/verses/nvi/random")
        .then((response) => response.data)
        .then((data) => {
          setAbbrev(data.book?.abbrev?.pt ?? "pt");
          setAuthor(data.book?.author ?? "Paulo");
          setName(data.book?.name ?? "Romanos");
          setGroup(data.book?.group ?? "Cartas");
          setChapter(data.chapter ?? 4);
          setNumber(data.number ?? 7);
          setText(
            data.text ??
              "Como são felizes aqueles que têm suas transgressões perdoadas, cujos pecados são apagados."
          );
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const values = {
    abbrev,
    author,
    name,
    group,
    chapter,
    number,
    text,
  };
  return <Book.Provider value={values}>{children}</Book.Provider>;
}

function useBook() {
  const context = useContext(Book);
  if (context === undefined) {
    throw new Error("useBook must be used within an BookProvider");
  }
  return context;
}

export { BookProvider, useBook };
