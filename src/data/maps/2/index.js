import _ from 'lodash'

const HEIGHT = 10;
const WIDTH = 20;
const MAX_ROOMS = 10;
const ROOM_SIZE_RANGE = [2, 6];

const c= { HEIGHT, WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE};

const isValidRoomPlacement = (tiles, {x, y, width = 1, height = 1}) => {
  // check if on the edge of or outside of the grid
  if (y < 1 || y + height > tiles.length - 1) {
    return false;
  }
  if (x < 1 || x + width > tiles[0].length - 1) {
    return false;
  }

  // check if on or adjacent to existing room
  for (let i = y - 1; i < y + height + 1; i++) {
    for (let j = x - 1; j < x + width + 1; j++) {
      if (tiles[i][j] === 1) {
        return false;
      }
    }
  }
  // all grid cells are clear
  return true;
};


let tiles = [];
for (let i = 0; i < c.HEIGHT; i++) {
  tiles.push([]);
  for (let j = 0; j < c.WIDTH; j++) {
    tiles[i].push(5)
  }
}

const createRoomsFromSeed = (tiles, {x, y, width, height}, range = c.ROOM_SIZE_RANGE) => {
  // range for generating the random room heights and widths
  const [min, max] = range;

  // generate room values for each edge of the seed room
  const roomValues = [];

  const north = { height: _.random(min, max), width: _.random(min, max) };
  north.x = _.random(x, x + width - 1);
  north.y = y - north.height - 1;
  north.doorx = _.random(north.x, (Math.min(north.x + north.width, x + width)) - 1);
  north.doory = y - 1;
  roomValues.push(north);

  const east = { height: _.random(min, max), width: _.random(min, max) };
  east.x = x + width + 1;
  east.y = _.random(y, height + y - 1);
  east.doorx = east.x - 1;
  east.doory = _.random(east.y, (Math.min(east.y + east.height, y + height)) - 1);
  roomValues.push(east);

  const south = { height: _.random(min, max), width: _.random(min, max) };
  south.x = _.random(x, width + x - 1);
  south.y = y + height + 1;
  south.doorx = _.random(south.x, (Math.min(south.x + south.width, x + width)) - 1);
  south.doory = y + height;
  roomValues.push(south);

  const west = { height: _.random(min, max), width: _.random(min, max) };
  west.x = x - west.width - 1;
  west.y = _.random(y, height + y - 1);
  west.doorx = x - 1;
  west.doory = _.random(west.y, (Math.min(west.y + west.height, y + height)) - 1);
  roomValues.push(west);

  const placedRooms = [];
  roomValues.forEach(room => {
    if (isValidRoomPlacement(tiles, room)) {
      // place room
      tiles = placeCells(tiles, room);
      // place door
      tiles = placeCells(tiles, {x: room.doorx, y: room.doory}, 3);
      // need placed room values for the next seeds
      placedRooms.push(room);
    }
  });
  return {tiles, placedRooms};
};

const placeCells = (tiles, {x, y, width = 1, height = 1,}, tile = 1) => {
  for (let i = y; i < y + height; i++) {
    for (let j = x; j < x + width; j++) {
      tiles[i][j] = tile;
    }
  }
  return tiles;}

  // Below is optional code for a randomly placed first room of a random size

	// 2. random values for the first area
	// const [min, max] = c.ROOM_SIZE_RANGE;
	// const firstRoom = {
	// 	x: _.random(1, c.WIDTH - max - 5),
	// 	y: _.random(1, c.HEIGHT - max - 5),
	// 	height: _.random(min, max),
	// 	width: _.random(min, max)
  // };

  // Alternative first room placed at 0,0 to make sure the player is placed in the first room

  const firstRoom = {
		x: 0,
		y: 0,
		height: 2,
		width: 2
  };


  tiles = placeCells(tiles, firstRoom);

//  4. using the first room as a seed, recursivley add rooms to the grid
const growMap = (tiles, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
  if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
    return tiles;
  }

  tiles = createRoomsFromSeed(tiles, seedRooms.pop());
  seedRooms.push(...tiles.placedRooms);
  counter += tiles.placedRooms.length;
  return growMap(tiles.tiles, seedRooms, counter);
};
growMap(tiles, [firstRoom]);

export {tiles}