Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath('Ext.ux.DataView', 'http://examples.sencha.com/extjs/5.1.0/examples/ux/DataView/');

Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View',
    'Ext.ux.DataView.DragSelector',
    'Ext.ux.DataView.LabelEditor'
]);

Ext.onReady(function(){
    ImageModel = Ext.define('ImageModel', {
        extend: 'Ext.data.Model',
        fields: [
           {name: 'name'},
           {name: 'url'},
           {name: 'size', type: 'float'},
           {name:'lastmod', type:'date', dateFormat:'timestamp'}
        ]
    });

    var store = Ext.create('Ext.data.Store', {
        id: 'viewStore',
        model: 'ImageModel', 
        proxy: {
            type: 'memory', 
            reader: {
                type: 'json',
                rootProperty: 'images'
            }
        }
    });

    Ext.create('Ext.Panel', {
        id: 'images-view',
        frame: true, 
        renderTo: 'dataview',
        title: 'Web screenshot netdb.io (0 items selected)',
        items: Ext.create('Ext.view.View', {
            store: store,
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{product:stripTags}">',
                        '<div class="thumb"><img src="http://api.screenshotmachine.com/?key={[this.getKey()]}&size=t&url=http://{ip}" title="{product:htmlEncode}"></div>',
                        '<span class="x-editable">{ip:htmlEncode} - {product:htmlEncode}</span>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>', {
                getKey: function(){
                	return window.key;
                }
                }),
            multiSelect: true, 
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'name'})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.name, 15),
                    sizeString: Ext.util.Format.fileSize(data.size),
                    dateString: Ext.util.Format.date(data.lastmod, "m/d/Y g:i a")
                });
                return data;
            },
            listeners: {
                selectionchange: function(dv, nodes ){
                    var l = nodes.length,
                        s = l !== 1 ? 's' : '';
                    this.up('panel').setTitle('Web screenshot netdb.io (' + l + ' item' + s + ' selected)');
                }
            }
        })
    });
});
