import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandleClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkupButton(page) {
    const prevPage = ` 
            <button data-goto="${
              this._data.page - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
              </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
    `;
    const nextPage = `
            <button data-goto="${
              this._data.page + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
    `;
    return page === 'prevPage' ? prevPage : nextPage;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are more pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('nextPage');
    }

    //On the last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prevPage');
    }
    //Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prevPage') +
        this._generateMarkupButton('nextPage')
      );
    }
    //Page 1 and there are NO other pages
    return '';
  }
}
export default new PaginationView();
