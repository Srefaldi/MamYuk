const itActsAsFavoriteMovieModel = (favoriteMovie) => {
  it('should return the movie that has been added', async () => {
    favoriteMovie.putResto({ id: 1 });
    favoriteMovie.putResto({ id: 2 });

    expect(await favoriteMovie.getResto(1)).toEqual({ id: 1 });
    expect(await favoriteMovie.getResto(2)).toEqual({ id: 2 });
    expect(await favoriteMovie.getResto(3)).toEqual(undefined);
  });

  it('should refuse a movie from being added if it does not have the correct property', async () => {
    favoriteMovie.putResto({ aProperty: 'property' });

    expect(await favoriteMovie.getAllResto()).toEqual([]);
  });

  it('can return all of the movies that have been added', async () => {
    favoriteMovie.putResto({ id: 1 });
    favoriteMovie.putResto({ id: 2 });

    expect(await favoriteMovie.getAllResto()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite movie', async () => {
    favoriteMovie.putResto({ id: 1 });
    favoriteMovie.putResto({ id: 2 });
    favoriteMovie.putResto({ id: 3 });

    await favoriteMovie.delateResto(1);

    expect(await favoriteMovie.getAllResto()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a movie even though the movie has not been added', async () => {
    favoriteMovie.putResto({ id: 1 });
    favoriteMovie.putResto({ id: 2 });
    favoriteMovie.putResto({ id: 3 });

    await favoriteMovie.delateResto(4);

    expect(await favoriteMovie.getAllResto()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteMovieModel };
