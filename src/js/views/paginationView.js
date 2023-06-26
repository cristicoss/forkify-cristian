import icons from '../../img/icons.svg';
import { RES_PER_PAGE } from '../config.js';
import View from './View.js';
import { generateMarkupButton } from '../helpers.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return generateMarkupButton('right', currPage);
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return generateMarkupButton('left', currPage);
    }

    // Other page
    if (currPage < numPages)
      return `${generateMarkupButton('left', currPage)} ${generateMarkupButton(
        'right',
        currPage
      )}`;

    // Page 1, and no other pages
    return '';
  }
}

export default new PaginationView();
