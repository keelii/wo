module.exports = {
    _layout: 'views/layout/layout.html',
    _blocks: {
        style: '\
        {% block style %}\
            {{ super() }}\
            <!--after-->\
            {{ Tag("link", "./module.css") }}\
        {% endblock %}',
        script: '\
        {% block script %}\
            <!--before-->\
            {{ super() }}\
            {{ Tag("script", "./module.js") }}\
        {% endblock %}'
    },
    data: {
        'id': 'mod-default',
        'class': 'mod-def'
    }
};
