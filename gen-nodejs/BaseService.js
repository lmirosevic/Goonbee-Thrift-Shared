//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./GoonbeeShared_types');
//HELPER FUNCTIONS AND STRUCTURES

GBShared.BaseService_alive_args = function(args) {
};
GBShared.BaseService_alive_args.prototype = {};
GBShared.BaseService_alive_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GBShared.BaseService_alive_args.prototype.write = function(output) {
  output.writeStructBegin('BaseService_alive_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

GBShared.BaseService_alive_result = function(args) {
  this.success = null;
  this.error = null;
  if (args instanceof ttypes.RequestError) {
    this.error = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.error !== undefined) {
      this.error = args.error;
    }
  }
};
GBShared.BaseService_alive_result.prototype = {};
GBShared.BaseService_alive_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.error = new ttypes.RequestError();
        this.error.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

GBShared.BaseService_alive_result.prototype.write = function(output) {
  output.writeStructBegin('BaseService_alive_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  if (this.error !== null && this.error !== undefined) {
    output.writeFieldBegin('error', Thrift.Type.STRUCT, 1);
    this.error.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

GBShared.BaseServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
GBShared.BaseServiceClient.prototype = {};
GBShared.BaseServiceClient.prototype.alive = function(callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_alive();
};

GBShared.BaseServiceClient.prototype.send_alive = function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('alive', Thrift.MessageType.CALL, this.seqid);
  var args = new GBShared.BaseService_alive_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

GBShared.BaseServiceClient.prototype.recv_alive = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new GBShared.BaseService_alive_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.error) {
    return callback(result.error);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('alive failed: unknown result');
};
GBShared.BaseServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
GBShared.BaseServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

GBShared.BaseServiceProcessor.prototype.process_alive = function(seqid, input, output) {
  var args = new GBShared.BaseService_alive_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.alive(function (err, result) {
    var result = new GBShared.BaseService_alive_result((err != null ? err : {success: result}));
    output.writeMessageBegin("alive", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

