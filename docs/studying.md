---
title: 留言板
comments: true
---

这一部分将陆陆续续汇集平常学习了解的*杂七杂八*的内容和技能。

???+ abstract
    - SQL: [=5% "5%"]{: .progress}
    - PS


## SQL  
### Tutorials & Materials
- [14min SQL 教程]( https://www.bilibili.com/video/BV1bQxMehETa/?share_source=copy_web&vd_source=5571c774db3be3b200d58dee94d6f7a6 )

### Basic Operation
不区分大小写；
> **优先级**：  
> SELECT column_name(s)  
> FROM table_name(s)  
> [JOIN ... ON ...]  
> [WHERE condition]  
> [GROUP BY column_name(s)]  
> [HAVING condition]  
> [ORDER BY column_name(s) [ASC | DESC]]  
> [LIMIT count]  
> [OFFSET count];  
> AND > OR 


#### setup
create, drop, alter, insert, update, delete +对象类型+名字
```
create DATABASE db_name; # 创建数据库
USE db_name; # 选择数据库
drop DATABASE db_name; # 删除数据库

create TABLE table_name(
    ID datatype PRIMARY KEY, # INT VARCHAR()  
    col2 datatype, 
    ...);
DROP TABLE table_name;

alter table t1 RENAME TO t2;
alter TABLE t1 ADD COLUMN col datatype;
alter TABLE t1 DROP COLUMN col;

insert into table_name(col1, col2, ...)
VALUES(Acol1, Acol2), (Bcol1, Bcol2); # 插入数据

update table_name 
SET col1 = value1, col2 = value2 #列名=值
WHERE condition; # 更新符合条件的数据

delete from t1 
WHERE condition; # 删除符合条件的数据
```    

#### fliter

```
select * from table_name; # 查询整个表
select col1, col2 from table_name; # 查询指定col
select col from t1 LIMIT 10; # 限制查询行数

select col 
from t1 
LIMIT 10 
OFFSET 5; # 跳过5行再查询10行

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

```
#### calculate
```
select ROUND(AVG(col1),1) col2 # 保留一位小数点并创建新列
from t1
GROUP BY col3
HAVING col2 > 10; 

select MAX(col1), MIN(col1), SUM(col1), COUNT(col) # 注意括号

select COUNT(DISTINCT col1) # 总行数
select COUNT(DISTINCT col1) # 去重行数

select DISTINCT col1
from t1
where col1 IS NOT NULL; # 非空

```

#### join
```
select *
from t1
JOIN t2 
ON t1.col1 = t2.col1; 

select t1.A, t1.B, t2.Y # 最后输出新表需要的列
from t1
inner JOIN t2 # 内连接
on t1.A = t2.X
where t1.A > 10; 

select t1.A, t1.B, t2.Y
from t1
left JOIN t2 # 左连接
right JOIN t2 # 右连接
full JOIN t2 # 全连接
cross JOIN t2 # 笛卡尔积
where t1.A > 10;

on t1.A = t2.X

```
{==难点与易错点==}
!!! question
    1. left join、right join、full join、cross join、self join、inner join
    2. case when then else end