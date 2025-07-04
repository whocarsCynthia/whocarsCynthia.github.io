---
title: 人类生存指南
comments: False
---

## Tutorials & Materials
- [x] [14min SQL 教程]( https://www.bilibili.com/video/BV1bQxMehETa/?share_source=copy_web&vd_source=5571c774db3be3b200d58dee94d6f7a6 )

## Basic SQL 
不区分大小写；
```SQL title="优先级" 
  SELECT col(s), [CASE WHEN THEN ELSE END] 
  FROM table_name(s)  
  [JOIN ... ON ...]  
  [WHERE condition]  
  [GROUP BY col]  
  [HAVING condition]  
  [ORDER BY col [ASC | DESC]] [CASE WHEN THEN ELSE END] 
  [LIMIT count]  
  [OFFSET count];  
  AND > OR 
```

<details>
  <summary>点击展开基础操作</summary>
    
    DDL 数据定义语言 create, drop, alter, show +对象类型+名字<br>
    DML 数据操作语言 insert, update, delete

    ``` SQL title="setup"
    create DATABASE db_name; # 创建数据库
    USE db_name; # 选择数据库
    drop DATABASE db_name; # 删除数据库

    create TABLE table_name(
        ID datatype PRIMARY KEY, # INT VARCHAR() CHAR() BOOL DATE
        col2 datatype, 
        ...);
    DROP TABLE table_name;

    alter table t1 RENAME TO t2;
    alter TABLE t1 ADD COLUMN col datatype;
    alter TABLE t1 DROP COLUMN col;
    alter TABLE t1 RENAME COLUMN col1 TO col2;
    alter TABLE t1 MODIFY COLUMN col datatype;
    alter TABLE t1 CHANGE col1 col2 datatype; # MySQL

    insert into table_name(col1, col2, ...)
    VALUES(Acol1, Acol2), (Bcol1, Bcol2); # 插入数据

    update table_name 
    SET col1 = value1, col2 = value2 #列名=值
    WHERE condition; # 更新符合条件的数据

    delete from t1 
    WHERE condition; # 删除符合条件的数据
    ```    


    DQL 数据查询 关键字, 模糊%_, 非空null, 去重distinct, 排序order by,  

    ``` SQL  title="fliter" 
    select * from table_name; # 查询整个表
    select col1, col2 from table_name; # 查询指定col
    select col from t1 LIMIT 10; # 限制查询行数

    select col 
    from t1 
    LIMIT 10 
    OFFSET 5; # 跳过5行再查询10行

    select col from t1 LIMIR 0,5; # Mysql分页查询第一页前五条

    select col1, col2 
    from t1
    where 分数 > 10 AND 班级<>'1'
    ORDER BY col1 DESC; 

    select col1, col2
    from t1
    where 姓名 LIKE '张%'；# %表示任意多个字符
    where 姓名 LIKE '张_'；# _表示任意一个字符
    where 分数 BETWEEN 10 AND 20; 
    where 分数 >= 10 AND 分数 <= 20; # 等价
    where 姓名 IN ('张三','张三丰'); # 简化OR，非连续范围
    where 姓名 NOT IN ('张三','张三丰');
    where col1 IS NOT NULL;

    ```
    
    聚合函数 count, sum, avg, max, min 注意括号<br>  
    分组查询 group by <br> 
    窗口函数<br> 
    函数名(...) OVER ( <br>  
    PARTITION BY ...  -- 按谁分组（可选）<br>   
    ORDER BY ...      -- 按什么顺序（可选） <br>  
    ROWS BETWEEN ...  -- 行范围（可选）<br>   
    )<br> 
    ```
     ROW_NUMBER()  给每组中每行编号，从 1 开始       
     RANK()        排名（有并列，跳号）      
     DENSE_RANK()  排名（有并列，不跳号）
     LAG(col)      取前一行的某列值（同组内）
     LEAD(col)     取后一行的某列值（同组内）     
    ```

    ``` SQL  title="calculate" 
    select ROUND(AVG(col1),1) col2 # 保留一位小数点并创建新列
    from t1
    GROUP BY col3
    HAVING col2 > 10; 

    select MAX(col1), MIN(col1), SUM(col1), COUNT(col) 

    select COUNT(DISTINCT col1) # 总行数
    select COUNT(DISTINCT col1) # 去重行数

    select DISTINCT col1
    from t1
    where col1 IS NOT NULL; # 非空

    ```

    

    ``` SQL  title="join"  
    select *
    from t1 # t1为左表
    JOIN t2 # t2为右表
    ON t1.col1 = t2.col1; # 等价于 using(col1)

    select t1.A, t1.B, t2.Y # 最后输出新表所含的列
    from t1
    inner JOIN t2 # 内连接，得到交集
    on t1.A = t2.X
    where t1.A > 10; 

    select t1.A, t1.B, t2.Y
    from t1
    left JOIN t2 # 左连接，得到左表行数
    right JOIN t2 # 右连接，得到右表行数，等价于左连接左右表位置互换
    full JOIN t2 # 全连接，得到并集，mySQL不可用
    on t1.A = t2.X 
    where t1.A > 10;
    ```

    子查询可以作为条件，使用运算符去判断。 运算符： > >= < <= = in

    ``` SQL  title="subquery"  
    select * from t1 where col1 IN (select col1 from t2);

    SELECT * 
    FROM dept t1, (SELECT * FROM emp WHERE emp.`join_date` > '2011-11-11') t2 # 子查询作为一张虚拟表
    WHERE t1.id = t2.dept_id; 
    
    SELECT * 
    FROM emp t1, dept t2 
    WHERE t1.`dept_id` = t2.`id` AND t1.`join_date` >  '2011-11-11' # 等价

    ```

    DCL 数据控制 管理用户、权限

    ``` SQL  title="manage"  
    create user 'username'@'host' identified by 'password';
    drop user 'username'@'host';

    show grants for 'username'@'host';
    grant 权限列表 on 数据库名.*(表名) to 'username'@'host';
    grant all on *.* to 'username'@'host';
    revoke 权限列表 on 数据库名.*(表名) from 'username'@'host';
    revoke update on 数据库名.表名 from 'username'@'host';
    ```
</details>

{==难点与易错点==}
??? question
    1. **left join, right join, inner join, full join**  
        注意两个表的字段都会保留，当t1和t2中有同名字段，比如 id，结果中会显示两列id 
        左连接，为左表的所有行匹配右表行，没有匹配的行为NULL；右连接反之；  
        内连接，为两个表匹配行，交集；  
        全连接，为两个表匹配行并返回所有行，并集； 
    2. **cross join, self join**  
        cross join，笛卡尔积，生成所有组合； 
        ```
        select t1.A, t1.B, t2.Y
        from t1
        cross JOIN t2 

        select t1.A, t1.B, t2.Y
        from t1, t2 # 隐式内连接，等价于cross join

        ```

        self join，自身连接，并非一个语法，例如：  
        
        ```
        SELECT a.name AS employee, b.name AS manager  
        FROM employees a  
        LEFT JOIN employees b # 注意此处左右表都是employees
        ON a.manager_id = b.emp_id; # employees表至少有 emp_id, manager_id, name 字段
        ```
    3. **case when then else end**
        类似于if-else语句，例如： 
        ```
        
        SELECT name, dept_id, # 逗号
            CASE 
                WHEN dept_id = 10 THEN '销售部' # 注意缩进
                WHEN dept_id = 20 THEN '财务部'
                ELSE '未知部门'
            END AS dept_name #生成新列，else和as可选
        FROM employees;
        ``` 
    4. **重命名操作**  
       
       - 查询中临时修改表名和列名 `AS`，例如：  
         ```
         select e.col1 d.col2  
         from employee e
         left join department d
         on e.id = d.id;    
         select e.col1 as col2, d.col2 as col3...
         ``` 
       - 永久修改表名和列名 `RENAME TO`，例如：       
         ```  
         alter table employee rename to e;       
         alter table employee renamte column col1 to col2; 
         alter table employee change col1 col2 datatype; # MySQL
         
         ```   
 
    5. **WHERE 不能使用聚合函数**   

## Error Analysis
??? warning "Error"
    1. **外连接** 
      
        | id | name  | salary | managerId |
        | -- | ----- | ------ | --------- |
        | 1  | Joe   | 70000  | 3         |
        | 2  | Henry | 80000  | 4         |
        | 3  | Sam   | 60000  | null      |
        | 4  | Max   | 90000  | null      |
    
        ```
        select * from Employee a 
        left join Employee b on a.id = b.managerId; # 找下属
        ```
    
        output： 

        | id | name  | salary | managerId | id   | name  | salary | managerId |
        | -- | ----- | ------ | --------- | ---- | ----- | ------ | --------- |
        | 1  | Joe   | 70000  | 3         | null | null  | null   | null      |
        | 2  | Henry | 80000  | 4         | null | null  | null   | null      |
        | 3  | Sam   | 60000  | null      | 1    | Joe   | 70000  | 3         |
        | 4  | Max   | 90000  | null      | 2    | Henry | 80000  | 4         |

        ```
        select *from Employee a 
        left join Employee b on a.managerId = b.id; # 找经理
        ```
        output:  

         | id | name  | salary | managerId | id   | name | salary | managerId |
        | -- | ----- | ------ | --------- | ---- | ---- | ------ | --------- |
        | 1  | Joe   | 70000  | 3         | 3    | Sam  | 60000  | null      |
        | 2  | Henry | 80000  | 4         | 4    | Max  | 90000  | null      |
        | 3  | Sam   | 60000  | null      | null | null | null   | null      |
        | 4  | Max   | 90000  | null      | null | null | null   | null      |


