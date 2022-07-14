CREATE TABLE SALARIES (
    professor_name VARCHAR(45),
    department VARCHAR(45),
    salary DOUBLE
)

INSERT INTO  `SALARIES`( professor_name ,
    department ,
    salary )
VALUES("KING","DEPID",6.0)

SELECT ALL FROM salaries ORDER BY professor_name DESC