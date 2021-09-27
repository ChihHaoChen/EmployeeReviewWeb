# Brief Report about The Challenge

## Features and database schema

![challenge.svg](BriefReport/challenge.svg)

## Client Side (http://localhost:3000)

### Assumptions

1. No global state management, therefore, whenever database is updated through the developed server, the client side has to be refreshed to fetch the most updated data.
2. 3 pages for the user flow:
    1.  one page for user to enter into the admin mode and employee mode;

        ![Screen Shot 2021-09-16 at 9.57.06 AM.png](BriefReport/Screen_Shot_2021-09-16_at_9.57.06_AM.png)

    2. one page to allow the admin to add/remove/update/view employees, and also admin can assign other employees for peer reviews;

        ![Screen Shot 2021-09-16 at 9.58.29 AM.png](BriefReport/Screen_Shot_2021-09-16_at_9.58.29_AM.png)

    3. one page to allow employees to submit their peer reviews, and to show message if no assigned reviews left.
        - No reviews assigned or all assigned reviews are submitted already.

        ![Screen Shot 2021-09-16 at 10.10.59 AM.png](BriefReport/Screen_Shot_2021-09-16_at_10.10.59_AM.png)

        - With assigned reviews not submitted yet.

        ![Screen Shot 2021-09-16 at 10.12.40 AM.png](BriefReport/Screen_Shot_2021-09-16_at_10.12.40_AM.png)

3. Styles are mainly focused in the UI components for primary function, and limited styling due to time limit.
4. Although Next.js is employed in this challenge project, no SSR has been implemented yet.

### Client Side (/web)

```jsx
yarn install // To install the used libraries
yarn dev // To start the client
```

### Todo Item for Further Improvements (/web)
- Refactoring is necessary for cleaner code, better readability, and modularization of code;
- Global state statement or more modern state management libraries can be used to have a responsive frontend;
- Urql ([https://formidable.com/open-source/urql/](https://formidable.com/open-source/urql/)) and its related libraries can be further studied and developed to allow SSR under the Next.js framework;
- Better UI components and UI design, for instance, the employee card container to view the feedback can be collapsed or design in a carousel style for cleaner UI. 

