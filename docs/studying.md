---
title: 人类生存指南
comments: False
---

这一部分将陆陆续续汇集平常学习了解的*杂七杂八* 的内容和技能。

???+ abstract
    - SQL: [=35% "35%"]{: .progress}
    - 商业化运营
    - 摄影
    - Tableau


## SQL  
### Tutorials & Materials
- [x] [14min SQL 教程]( https://www.bilibili.com/video/BV1bQxMehETa/?share_source=copy_web&vd_source=5571c774db3be3b200d58dee94d6f7a6 )

### Basic Operation
不区分大小写；
> **优先级**：  
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


#### setup
DDL 数据定义语言 create, drop, alter, show +对象类型+名字  
DML 数据操作语言 insert, update, delete

```
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

#### fliter
DQL 数据查询 关键字, 模糊%_, 非空null, 去重distinct, 排序order by,  

```
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
#### calculate
聚合函数 count, sum, avg, max, min 注意括号   
分组查询 group by  
窗口函数
> 函数名(...) OVER (  
  PARTITION BY ...  -- 按谁分组（可选）  
  ORDER BY ...      -- 按什么顺序（可选）  
  ROWS BETWEEN ...  -- 行范围（可选）  
)

| 函数             | 作用              |  函数             | 作用              |
| :--------------: | :---------------: |  :--------------: | :---------------: |
| `ROW_NUMBER()` | 给每组中每行编号，从 1 开始 | `LAG(col)`     | 取前一行的某列值（同组内）   |
| `RANK()`       | 排名（有并列，跳号）      | `LEAD(col)`    | 取后一行的某列值（同组内）   |
| `DENSE_RANK()` | 排名（有并列，不跳号）     |


```
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

#### join
```
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

#### subquery
子查询可以作为条件，使用运算符去判断。 运算符： > >= < <= = in

```
select * from t1 where col1 IN (select col1 from t2);

SELECT * 
FROM dept t1, (SELECT * FROM emp WHERE emp.`join_date` > '2011-11-11') t2 # 子查询作为一张虚拟表
WHERE t1.id = t2.dept_id; 
 
SELECT * 
FROM emp t1, dept t2 
WHERE t1.`dept_id` = t2.`id` AND t1.`join_date` >  '2011-11-11' # 等价

```
#### manage
DCL 数据控制 管理用户、权限

```
create user 'username'@'host' identified by 'password';
drop user 'username'@'host';

show grants for 'username'@'host';
grant 权限列表 on 数据库名.*(表名) to 'username'@'host';
grant all on *.* to 'username'@'host';
revoke 权限列表 on 数据库名.*(表名) from 'username'@'host';
revoke update on 数据库名.表名 from 'username'@'host';
```

{==难点与易错点==}
!!! question
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

### Error Analysis
???+ warning "ERROR"
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



## 商业化运营

[商业产品运营（广告方向）该怎么做？](https://www.zhihu.com/question/52108371/answer/264480245)

### Fundamental
1. 商业产品与用户产品不同的地方在于to b/to c。
2. 商业产品是以变现和赚钱为目的，用户产品是以用户增长和留存为目的。
3. 商业产品不排他，而用户产品是相对排他的。
4. 商业产品大部分是需要培训来使用户上手，而用户产品通常不需要培训用户就会使用。

### Concepts

#### index
| 指标名         | 全称                      | 用途                         |
| :-----------: | :-------------------------: | :-------------------------- |
| SOV     | Share of Voice            | 衡量品牌曝光在行业中占比，常用于**品牌建设**复盘 |
| COV     | Conversion over View      || 衡量广告转化率，适合衡量**品牌效果**         |
| SOI     | Share of Interaction      | 用户互动行为占比，适合衡量**内容型广告效果**   |
| ROAS    | Return on Ad Spend        | 广告支出回报率，精细化衡量**电商类效果广告效率** |
| CPO     | Cost per Order            | 单笔订单成本，适合有“下单”场景的广告主       |
| LTV     | Lifetime Value            | 用户生命周期价值，结合CPA评估长期投放策略     |
| CAC     | Customer Acquisition Cost | 获取一个新用户的平均花费               |
| CTR/CVR | 点击率/转化率              | 基础漏斗指标，用于识别素材&人群表现差异       |
| DAU    | Daily Active Users        | 日活用户数                         |
| GMV     | 商品交易总额               |                          |
| ROI    | 投资回报率                 |                         |
| PUR    | Pay Users Rate            | 付费率                   |
| ARPU   | 平均每用户贡献的收入        |                         |
| ARPPU  | 平均每付费用户贡献的收入     |                         |


#### Ad 

| 模式   | 计费逻辑         | 适合场景         |
| :----: | :------------: | :------------ |
| CPC (Click)  | 每点击一次计费      | 效果导向、点击跳转类广告 |
| CPM (Mille)  | 每千次展示计费      | 品牌展示，产品发布，打声量     |
| CPT (Time)  | 固定时段资源购买     | 买断，头部资源争抢，如明星开屏 |
| CPA (Action) | 每转化激活一次计费      | 电商下单，下载安装，注册行为    |
| CPI (Install) | 每安装一次计费      | 按照用户每次看到广告后，点击下载并完成安装进行收费    |
| CPS (Sell) | 按照销售来付费     | 按用户**交易金额**付费   |
| CPP (Purchase)  | 按交易笔数来结算     | 在用户点击广告并进行交易后，按**交易笔数**付给广告站点费用。 |
| OCPC | 优化后的CPC，基于转化 | 自动学习，高预算策略场景 |

#### data theories
| 名称                                | 核心解释          | 应用举例                        | 如何避免                                   |
| --------------------------------- | ------------- | --------------------------- | -------------------------------------- |
| 辛普森悖论                        | 整体趋势和分组趋势方向相反 | 总体转化率上升，但每个渠道都在下降           | 必须做**分层分析**、控制变量                       |
| 幸存者偏差                         | 只关注成功者，忽略失败样本 | 分析ROI时只看高转化用户，忽略大多数沉默用户     | **全面采样**，建立完整样本视角                      |
| 自选择偏差         | 用户主动选择造成样本失真  | 用户点击广告→认为广告有效，但可能只是已有意向用户点击 | 采用实验组vs对照组设计                      |
| 安慰剂效应         | 用户预期影响行为结果    | 用户觉得广告“看起来更高级”就多点击了         | 做A/B测试 + 隐藏变量控制*                   |
| 回归到均值     | 极端值表现会向平均靠拢   | 本周CTR突然高，下周自然下滑             | 长期追踪 vs 单日表现拆分理解                       |
| 多重比较问题 | 多次测试容易得出伪相关   | 做100次投放测试有5次必然显著            | 做Bonferroni correction或False Discovery Rate控制 |



### Examples
- 飞书文档某一天流量下滑 20%，你从哪些维度分析？  
    首先从用户维度拆出是数量（用户量）还是质量（使用深度）的问题，再逐步排查是来源维度（如特定的引流入口中断）、渠道维度（某个客户端入口异常）还是功能或者技术维度的问题，或者有可能是外部事件导致的异常。

- 理解抖音电商广告产品矩阵（DOU+ / 品牌广告 / 竞价广告等）的协同逻辑  
    抖音电商广告其实形成了一个协同矩阵。  
    DOU+主要是用来做**冷启、测试素材或者扩大自然量级**，它覆盖面广、成本低，但不精准；  
    竞价广告像FEED投放（信息流）则更适合**拉新和转化**，它依赖算法精准投人群，适合控ROI；  
    品牌广告，比如TopView或者超级首位，适合品牌打**声量**，在节日节点提升整体认知度。  
    所以这三类广告是“冷启–转化–品牌建设”的协同路径，在多目标投放策略中各自发挥作用。

- GMV提升30%，如何排除自然流量干扰？   
    一是技术层面，用归因数据判断GMV是来源于广告还是自然流量，比如通过短链跳转、UTM追踪、抖音后台的“广告GMV”指标做数据拆分；  
    二是对照实验，如果同时期未投放广告的产品GMV持平，而投放产品涨幅显著，说明广告贡献大；  
    同时也可以看“点击/浏览/投后新增粉丝”的指标，看用户是否是因广告路径进来的。
    这样可以最大程度排除自然流量影响，还原广告本身带来的GMV价值。

- 分析 TikTok Shop 与抖音电商的生态差异
    我觉得TikTok Shop跟抖音电商在逻辑上是一样的，但在发展阶段上有很大差异。抖音电商生态已经非常成熟，用户对直播带货、短视频种草都很习惯，达人、商家、平台规则也非常明确；  
    而TikTok Shop在很多海外市场还处于冷启阶段，用户购物心智没那么强，达人种草的路径还不完善，更多靠平台激励、跨境商品和内容驱动起量。  
    商家生态方面，抖音以本地品牌和强私域为主，而TikTok Shop还在培养本地商家，跨境商家是主力。  
    所以TikTok Shop还处于教育市场阶段，需要更强的内容运营、投放协同和商家服务。