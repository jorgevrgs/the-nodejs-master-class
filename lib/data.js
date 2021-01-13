/*
 * Library for storing and editing data
 *
 */

// Dependencies
const fs = require("fs");
const path = require("path");

// Container for module (to be exported)
let lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// Write data to a file
lib.create = function (dir, file, data, callback) {
  // Open the file for writing
  // "w" Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  // "wx" Like 'w' but fails if the path exists.
  fs.open(
    path.join(lib.baseDir, dir, `${file}.json`),
    "wx",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        let stringData = JSON.stringify(data);

        // Write to file and close it
        fs.writeFile(fileDescriptor, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptor, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("Could not create new file, it may already exist");
      }
    }
  );
};

// Read data from a file
lib.read = function (dir, file, callback) {
  fs.readFile(
    path.join(lib.baseDir, dir, `${file}.json`),
    "utf8",
    function (err, data) {
      callback(err, data);
    }
  );
};

// Update data in a file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  // "r+" Open file for reading and writing. An exception occurs if the file does not exist.
  fs.open(
    path.join(lib.baseDir, dir, `${file}.json`),
    "r+",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        let stringData = JSON.stringify(data);

        // Truncate the file
        fs.truncate(fileDescriptor, function (err) {
          if (!err) {
            // Write to file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
              if (!err) {
                fs.close(fileDescriptor, function (err) {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing existing file");
                  }
                });
              } else {
                callback("Error writing to existing file");
              }
            });
          } else {
            callback("Error truncating file");
          }
        });
      } else {
        callback("Could not open file for updating, it may not exist yet");
      }
    }
  );
};

// Delete a file
lib.delete = function (dir, file, callback) {
  // Unlink the file
  fs.unlink(path.join(lib.baseDir, dir, `${file}.json`), function (err) {
    if (!err) {
      callback(false);
    } else {
      callback("Error deleting file");
    }
  });
};

// Export the module
module.exports = lib;
