import {Dimensions} from 'react-native';

export const {height, width} = Dimensions.get('window');
export const BUTTON_WIDTH = 50;
export const BUTTON_HEIGHT = 175;
export const BUTTON_PADDING = 8;
export const SWIPEABLE_DIMENSIONS = BUTTON_WIDTH - 2 * BUTTON_PADDING;

export const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
export const H_SWIPE_RANGE =
  BUTTON_HEIGHT - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
