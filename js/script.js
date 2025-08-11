'use strict';

const titleClickHandler = function (event) {
  console.log('Link was clicked!');
  event.preventDefault();
  const clickedElement = this;
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(`${articleSelector}`);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags';

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  console.log(titleList);

  function clearMessages() {
    titleList.innerHTML = '';
  }

  clearMessages();

  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    console.log(article);

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] get the title from the title element */

    /* [DONE] create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagSelector);
    console.log(titleList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  console.log(tagList);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a> (' + allTags[tag] + ')</li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {
    /* remove class active */
    activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="' + href + '"]`);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

/*ADD AUTHORS*/

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);

    /* find tags wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
    console.log(titleList);

    /* make html variable with empty string */
    let html = '';

    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor+ '"><span>' + articleAuthor + '</span></a>';
    console.log(linkHTML);
    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
  }
  /* END LOOP: for every article: */
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all tag links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`a[href="' + href + '"]`);

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthor(){
  /* find all links to tags */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();

