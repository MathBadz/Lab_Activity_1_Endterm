# Lab 1 — Fetch & ETL with Plain Node.js

**Course:** Data Integration and ETL
**Lab:** Lab 1 of 6

## Group Members

-Badajos, Math Auric Ros D.
-Salazar, Shirley Ann M.
-Villalobos, Jon Nathaniel
-Yanson, Rea Nicole S.
-Zambra, Maika T.

---

## Task Answers

### Task 1 — Extract

**1. What fields are nested objects (not plain values)?**

The fields `address` and `company` are nested objects. The `address` field also contains a further nested object called `geo` which holds `lat` and `lng`.

**2. What is the value of `data[0].address.city`?**

`"Gwenborough"`

---

### Task 2 — Transform

**1. What does `.split(' ')[0]` do to the phone number?**

It splits the phone string at every space and takes only the first part. For example, `"1-770-736-8031 x56442"` becomes `"1-770-736-8031"`, removing the extension.

**2. Why do we use `parseFloat()` on `lat` and `lng`?**

The API returns them as strings (e.g. `"-37.3159"`). Converting them with `parseFloat()` ensures they are stored as proper numeric values instead of text.

**3. How many records passed the filter?**

All 10 records passed the filter. Every user in the dataset has a valid email address containing `@`.

---

### Task 3 — Load

**1. How many columns does the CSV have? List them.**

11 columns: `id`, `name`, `username`, `email`, `phone`, `city`, `zipcode`, `lat`, `lng`, `company`, `postCount`

**2. What is the company name of the user with `id = 5`?**

`"Keebler LLC"`

**3. What does `fs.writeFileSync()` do? What would happen if you used `fs.appendFileSync()` instead?**

`fs.writeFileSync()` creates the file if it does not exist, or completely overwrites it if it does, writing all the data at once. If `fs.appendFileSync()` were used instead, every time the script runs it would add new rows to the end of the existing file without clearing it first — causing duplicate headers and repeated data across multiple runs.

---

## Challenges Completed

### Challenge A — Fetch Posts Too
Fetches the `/posts` endpoint (100 posts) and counts how many posts each user has written. Adds a `postCount` column to the CSV output.

### Challenge B — Error Handling
The `main()` function is wrapped in a `try/catch` block. If the API is unreachable or returns an error, the script prints a friendly `[ERROR]` message and exits cleanly instead of crashing.

### Challenge C — Filter by Condition
The `transform()` function filters to only keep users whose `lat` coordinate is negative (Southern Hemisphere). **7 out of 10 users** remain after this filter.

---


