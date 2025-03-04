import Handlebars from 'handlebars';

export const helpers = {
    'if_eq': function (a, b, opts) {
        if (a === b)
            return opts.fn(this);
        else
            return opts.inverse(this);
    },

    renderStars: function(importance) {
        let stars = '';
        for (let i = 0; i < importance; i++) {
            stars += '★';
        }
        for (let i = importance; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    }
}
