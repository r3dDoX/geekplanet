import * as underTest from './productCategoryHelper';

describe('ProductCategory Helper', () => {
  describe('recursivelyMapSubCategories', () => {
    it('should not modify given category', () => {
      const productCategories = [
        {
          _id: 'parentProduct',
        },
      ];

      underTest.recursivelyMapSubCategories(productCategories[0], productCategories);

      expect(productCategories[0].subCategories).toBe(undefined);
    });

    it('should fill subCategories property with empty array when no category match', () => {
      const productCategories = [
        {
          _id: 'parentProduct',
        },
        {
          _id: 'someOtherParentProduct',
          prentCategory: 'someParentProduct',
        },
      ];

      const result = underTest.recursivelyMapSubCategories(productCategories[0], productCategories);

      expect(result.subCategories).toHaveLength(0);
    });

    it('should map subcategories to given category when parentCategory matches', () => {
      const productCategories = [
        {
          _id: 'parentProduct',
        },
        {
          _id: 'someOtherParentProduct',
        },
        {
          _id: 'childProduct',
          parentCategory: 'parentProduct',
        },
        {
          _id: 'childChildProduct',
          parentCategory: 'childProduct',
        },
      ];

      const result = underTest.recursivelyMapSubCategories(productCategories[0], productCategories);

      expect(result.subCategories).toHaveLength(1);
      expect(result.subCategories[0]._id).toBe('childProduct');
      expect(result.subCategories[0].subCategories).toHaveLength(1);
      expect(result.subCategories[0].subCategories[0]._id).toBe('childChildProduct');
    });
  });

  describe('recursivelyMapIds', () => {
    it('should add category id to array when no subcategories', () => {
      const category = {
        _id: 'Lonely Category',
        subCategories: [],
      };

      const result = underTest.recursivelyMapIds(category);

      expect(result).toHaveLength(1);
      expect(result[0]).toBe('Lonely Category');
    });

    it('should add ids of subcategories to array as well', () => {
      const category = {
        _id: 'Lonely Category',
        subCategories: [
          {
            _id: 'Some Child Category',
            subCategories: [
              {
                _id: 'Some Child Child Category',
                subCategories: [],
              },
            ],
          },
          {
            _id: 'Some Other Child Category',
            subCategories: [],
          },
        ],
      };

      const result = underTest.recursivelyMapIds(category);

      expect(result).toHaveLength(4);
      expect(result).toEqual(expect.arrayContaining([
        'Lonely Category',
        'Some Child Category',
        'Some Child Child Category',
        'Some Other Child Category',
      ]));
    });
  });

  describe('recursivelyMapIdsIfNotPresent', () => {
    it('should not do anything when given category already in existing array', () => {
      const presentCategories = [
        {
          _id: 'Lonely Category',
          subCategories: [],
        },
      ];

      const result = underTest
        .recursivelyMapIdsIfNotPresent(presentCategories, presentCategories[0]);

      expect(result).toHaveLength(0);
    });

    it('should map category and subcategory ids to resulting array', () => {
      const presentCategories = [
        {
          _id: 'Lonely Category',
          subCategories: [],
        },
      ];

      const category = {
        _id: 'Big Category',
        subCategories: [
          {
            _id: 'Some Child Category',
            subCategories: [
              {
                _id: 'Some Child Child Category',
                subCategories: [],
              },
            ],
          },
          {
            _id: 'Some Other Child Category',
            subCategories: [],
          },
        ],
      };

      const result = underTest.recursivelyMapIdsIfNotPresent(presentCategories, category);

      expect(result).toHaveLength(4);
    });

    it('should not map subcategory already contained in present categories', () => {
      const presentCategories = [
        {
          _id: 'Some Child Category',
          subCategories: [
            {
              _id: 'Some Child Child Category',
              subCategories: [],
            },
          ],
        },
      ];

      const category = {
        _id: 'Big Category',
        subCategories: [
          {
            _id: 'Some Child Category',
            subCategories: [
              {
                _id: 'Some Child Child Category',
                subCategories: [],
              },
            ],
          },
          {
            _id: 'Some Other Child Category',
            subCategories: [],
          },
        ],
      };

      const result = underTest.recursivelyMapIdsIfNotPresent(presentCategories, category);

      expect(result).toHaveLength(3);
    });
  });
});
