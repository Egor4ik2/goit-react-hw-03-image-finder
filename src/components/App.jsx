import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGal/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchImages } from './api/Api'; 
import styles from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    isLoading: false,
    page: 1,
    selectedImageURL: '',
    hasMoreImages: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(searchQuery, page) 
      .then((hits) => {
        if (hits.length > 0) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...hits],
            hasMoreImages: hits.length === 12,
          }));
        } else {
          this.setState({ hasMoreImages: false });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleFormSubmit = (query) => {
    this.setState({ searchQuery: query, page: 1, images: [], hasMoreImages: true });
  };

  handleImageClick = (imageURL) => {
    this.setState({ selectedImageURL: imageURL });
  };

  handleCloseModal = () => {
    this.setState({ selectedImageURL: '' });
  };

  handleLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }), () => {
      this.fetchImages();
    });
  };

  render() {
    const { images, isLoading, selectedImageURL, hasMoreImages } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {isLoading && <Loader />}

        {images.length > 0 && hasMoreImages && (
          <Button onClick={this.handleLoadMore} />
        )}

        {selectedImageURL && (
          <Modal imageURL={selectedImageURL} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}
